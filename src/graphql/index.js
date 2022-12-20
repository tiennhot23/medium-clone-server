const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const loaders = require('./loaders');
const { caching } = require('../utils');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const context = {
      req,
      res,
      caching,
      loaders,
    };

    const { uid, deviceid, sid } = req.cookie;
    if (uid && deviceid) {
      // handle session expiration
      const requestSessionID = `sess:${sid}`;
      const storageSessionID = await caching.call('hget', `user:${uid}:sessions`, `${deviceid}`);

      if (!storageSessionID || storageSessionID !== requestSessionID) {
        await caching.call('hdel', `user:${uid}:sessions`, `${deviceid}`);
        req.session.destroy();
        res.clearCookie('uid');
        res.clearCookie('deviceid');
        res.clearCookie('sid');
        throw new AuthenticationError('[UNUSUAL REQUEST] Cannot authorized. Please login again');
      }

      if (sid !== req.sessionID) {
        await caching.call('hset', `user:${uid}:sessions`, `${deviceid}`, `sess:${req.sessionID}`);
        req.session.userId = uid;
      }

      // authenticate user
      const cachedUser = JSON.parse(await caching.call('get', uid));
      if (!cachedUser) {
        const { userLoader } = loaders;
        const user = await userLoader.load(uid);
        if (!user) {
          throw new AuthenticationError('Cannot authorized');
        } else {
          await caching.callType('user', 'set', uid, user);
          context.user = user;
        }
      } else {
        context.user = cachedUser;
      }
    }

    return context;
  },
  formatError: err => {
    logger.error(`Request error: ${err.extensions.localMessage}`, err.message);
    return {
      error: err.extensions.code,
      code: err.extensions.status,
      message: err.message,
    };
  },
});

module.exports = async app => {
  await server.start();
  server.applyMiddleware({ app });
};
