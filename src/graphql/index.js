const Redis = require('ioredis');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const loaders = require('./loaders');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const redis = new Redis();
    const context = {
      req,
      res,
      redis,
      loaders,
    };

    const { uid, deviceid, sid } = req.cookie;
    if (uid && deviceid) {
      // handle session expiration
      const requestSessionID = `sess:${sid}`;
      const storageSessionID = await redis.hget(`user:${uid}:sessions`, `${deviceid}`);

      if (!storageSessionID || storageSessionID !== requestSessionID) {
        await redis.hdel(`user:${uid}:sessions`, `${deviceid}`);
        req.session.destroy();
        res.clearCookie('uid');
        res.clearCookie('deviceid');
        res.clearCookie('sid');
        throw new AuthenticationError('[UNUSUAL REQUEST] Cannot authorized. Please login again');
      }

      if (sid !== req.sessionID) {
        await redis.hset(`user:${uid}:sessions`, `${deviceid}`, `sess:${req.sessionID}`);
        req.session.userId = uid;
      }

      // authenticate user
      const cachedUser = JSON.parse(await redis.get(uid));
      if (!cachedUser) {
        const { userLoader } = loaders;
        const user = await userLoader.load(uid);
        if (!user) {
          throw new AuthenticationError('Cannot authorized');
        } else {
          await redis.set(uid, JSON.stringify(user));
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
