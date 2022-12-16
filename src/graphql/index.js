const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const user = { name: 'tien', _id: '639afff43da447cea21b1b8b' };
    if (!user) throw new AuthenticationError('you must be logged in');
    // res.header('Access-Control-Allow-Credentials', 'true');
    return {
      req,
      res,
      user,
    };
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
