const graphqlFields = require('graphql-fields');
const { BlogModel } = require('../../models');

async function clapBlog(parent, { blogId, clapCount }, { user }, info) {
  if (!user) throw new AppError(403, 'Please login to continue');
  const projection = Object.keys(graphqlFields(info));
  const blog = await BlogModel.findOneAndUpdate(
    { _id: blogId },
    { $inc: { clapCount }, $addToSet: { claps: user._id } },
    { new: true, projection },
  ).lean();

  return blog;
}

async function createBlog(parent, { title, rawText }, { user }) {
  if (!user) throw new AppError(403, 'Please login to continue');
  const blog = await BlogModel.create({ author: user._id, title, rawText });

  return blog;
}

module.exports = { createBlog, clapBlog };
