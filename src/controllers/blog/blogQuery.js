const graphqlFields = require('graphql-fields');
const { PostModel } = require('../../models');

async function getPost(parent, { postId }, context, info) {
  const projection = Object.keys(graphqlFields(info));
  const post = await PostModel.findById(postId, projection).lean();
  if (!post) {
    throw new AppError(404, 'Can\'t find this post');
  }
  return post;
}

async function getPosts(parent, args, context, info) {
  const projection = Object.keys(graphqlFields(info));
  const posts = await PostModel.find({}, projection).lean();
  return posts;
}

async function getPostClaps({ claps }, args, { loaders }) {
  const { userLoader } = loaders;
  return userLoader.loadMany(claps);
}

async function getCreator({ creator }, args, { loaders }) {
  const { userLoader } = loaders;
  return userLoader.load(creator);
}

module.exports = { getPost, getPostClaps, getCreator, getPosts };
