const graphqlFields = require('graphql-fields');
const { UserModel } = require('../../models');

async function getUser(parent, { email }, __, info) {
  const projection = Object.keys(graphqlFields(info));
  const user = await UserModel.findOne({ email }, projection).lean();
  if (!user) {
    throw new AppError(404, 'Can\'t find this user');
  }
  return user;
}

module.exports = { getUser };
