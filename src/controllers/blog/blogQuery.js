const { BlogModel, UserModel } = require('../../models');

async function getBlog(parent, { blogId }) {
  try {
    const blog = await BlogModel.findById(blogId).lean();
    if (!blog) {
      throw new AppError(404, 'Can\'t find this blog');
    }
    return blog;
  } catch (error) {
    if (error instanceof AppError) throw error;
    else throw new AppError(500, error.message);
  }
}

async function getBlogClaps({ claps }) {
  try {
    const users = await UserModel.find({
      _id: { $in: claps },
    }, 'name avatar').lean();
    return users;
  } catch (error) {
    if (error instanceof AppError) throw error;
    else throw new AppError(500, error.message);
  }
}

module.exports = { getBlog, getBlogClaps };
