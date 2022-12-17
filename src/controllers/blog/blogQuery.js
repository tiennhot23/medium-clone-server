const graphqlFields = require('graphql-fields');
const { BlogModel, UserModel } = require('../../models');

async function getBlog(parent, { blogId }, context, info) {
  const projection = Object.keys(graphqlFields(info));
  const blog = await BlogModel.findById(blogId, projection).lean();
  if (!blog) {
    throw new AppError(404, 'Can\'t find this blog');
  }
  return blog;
}

async function getBlogClaps({ claps }, args, context, info) {
  /* *
    * be careful if graphql schema include sensitive fields
    */
  const projection = Object.keys(graphqlFields(info));
  const users = await UserModel.find({
    _id: { $in: claps },
  }, projection).lean();
  return users;
}

module.exports = { getBlog, getBlogClaps };
