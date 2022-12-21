const _ = require('lodash');
const graphqlFields = require('graphql-fields');
const { ParagraphModel, PostModel } = require('../../models');

async function clapPost(parent, { postId, clapCount }, { user }, info) {
  if (!user) throw new AppError(403, 'Please login to continue');
  const projection = Object.keys(graphqlFields(info));
  const post = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { clapCount }, $addToSet: { claps: user._id } },
    { new: true, projection },
  ).lean();

  return post;
}

// NOTE: draft post no need to cache, choose an redis data structure to cache post with publistTime
async function createPost(parent, { paragraphs }, { user }) {
  if (!user) throw new AppError(403, 'Please login to continue');

  const content = await ParagraphModel.insertMany(paragraphs, {
    lean: true, // skip hydrating and validating
  });
  const title = _.get(content[0], 'text');
  const previewImage = _.get(_.filter(content, para => para.type === 'img')[0], 'text');
  const post = await PostModel.create({ creator: user._id, title, previewImage });

  return post;
}

module.exports = { createPost, clapPost };
