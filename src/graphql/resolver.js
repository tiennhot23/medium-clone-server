const {
  createUser,
  login,
  logout,
  createBlog,
  clapBlog,
  getUser,
  getBlog,
  getBlogClaps,
  getAuthor,
  getBlogs,
} = require('../controllers');

const resolvers = {
  User: {
  },

  Blog: {
    author: getAuthor,
    claps: getBlogClaps,
  },

  // QUERY
  Query: {
    user: getUser,
    blog: getBlog,
    blogs: getBlogs,
  },

  Mutation: {
    createUser,
    login,
    logout,
    createBlog,
    clapBlog,
  },
};

module.exports = resolvers;
