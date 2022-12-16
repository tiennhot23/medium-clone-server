const { BlogModel } = require('../../models');
const { MutationResponse } = require('../../graphql/types/MutationResponse');

async function clapBlog(parent, { blogId, clapCount }, { user }) {
  try {
    const blog = await BlogModel.findOneAndUpdate(
      { _id: blogId },
      { $inc: { clapCount }, $addToSet: { claps: user._id } },
      { new: true },
    );

    return blog;
  } catch (error) {
    if (error instanceof AppError) throw error;
    else throw new AppError(500, error.message);
  }
}

async function createBlog(parent, { title, rawText }, { user }) {
  try {
    await BlogModel.create({ author: user._id, title, rawText });

    return new MutationResponse('Blog created');
  } catch (error) {
    if (error instanceof AppError) throw error;
    else throw new AppError(500, error.message);
  }
}

module.exports = { createBlog, clapBlog };
