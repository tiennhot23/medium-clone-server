const {
  createUser,
  login,
  logout,
  clapPost,
  createPost,

  getUser,
  getCreator,
  getPostClaps,
  getPost,
  getPosts,
} = require('../controllers');

const resolvers = {
  User: {
  },

  Post: {
    creator: getCreator,
    claps: getPostClaps,
  },

  Paragraph: {

  },

  // QUERY
  Query: {
    user: getUser,
    post: getPost,
    posts: getPosts,
  },

  Mutation: {
    createUser,
    login,
    logout,
    createPost,
    clapPost,
  },
};

module.exports = resolvers;
