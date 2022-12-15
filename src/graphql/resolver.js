const {
  createUser,
  login,
  getUser,
} = require('../controllers');

const resolvers = {
  User: {
  },

  // QUERY
  Query: {
    user: getUser,
  },

  Mutation: {
    createUser,
    login,
  },
};

module.exports = resolvers;
