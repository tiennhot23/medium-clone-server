const graphqlFields = require('graphql-fields');
const { BlogModel } = require('../../models');

async function getBlog(parent, { blogId }, context, info) {
  const projection = Object.keys(graphqlFields(info));
  const blog = await BlogModel.findById(blogId, projection).lean();
  if (!blog) {
    throw new AppError(404, 'Can\'t find this blog');
  }
  return blog;
}

async function getBlogs(parent, args, context, info) {
  const projection = Object.keys(graphqlFields(info));
  const blogs = await BlogModel.find({}, projection).lean();
  return blogs;
}

async function getBlogClaps({ claps }, args, { loaders }) {
  const { userLoader } = loaders;
  return userLoader.loadMany(claps);
}

async function getAuthor({ author }, args, { loaders }) {
  const { userLoader } = loaders;
  return userLoader.load(author);
}

module.exports = { getBlog, getBlogClaps, getAuthor, getBlogs };
