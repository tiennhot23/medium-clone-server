const graphqlFields = require('graphql-fields');
const { BlogModel } = require('../../models');
const { MutationResponse } = require('../../graphql/types/MutationResponse');

async function clapBlog(parent, { blogId, clapCount }, { user }, info) {
  const projection = Object.keys(graphqlFields(info));
  const blog = await BlogModel.findOneAndUpdate(
    { _id: blogId },
    { $inc: { clapCount }, $addToSet: { claps: user._id } },
    { new: true, projection },
  );

  return blog;
}

async function createBlog(parent, { title, rawText }, { user }) {
  await BlogModel.create({ author: user._id, title, rawText });

  return new MutationResponse('Blog created');
}

module.exports = { createBlog, clapBlog };
