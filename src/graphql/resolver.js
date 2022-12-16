const {
  createUser,
  login,
  createBlog,
  clapBlog,
  getUser,
  getBlog,
  getBlogClaps,
} = require('../controllers');

const resolvers = {
  User: {
  },

  Blog: {
    claps: getBlogClaps,
  },

  // QUERY
  Query: {
    user: getUser,
    blog: getBlog,
  },

  Mutation: {
    createUser,
    login,
    createBlog,
    clapBlog,
  },
};

module.exports = resolvers;
