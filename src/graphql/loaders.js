const _ = require('lodash');
const DataLoader = require('dataloader');
const { UserModel } = require('../models');

const userLoader = new DataLoader(async userIds => {
  // const cachedUser = JSON.parse(await redis.mget(userIds));
  // const uncachedIds = _.map(cachedUser, (val, key) => (val ? '' : userIds[key]));
  // const fetchUser = await UserModel.find({ _id: { $in: uncachedIds } }).lean();
  // const mapUser = _.reduce(cachedUser, (result, user, key) => {
  //   result[user._id] = user || fetchUser[key] || null;
  //   return result;
  // }, {});
  // return userIds.map(userId => (mapUser[userId]));

  const users = await UserModel.find({ _id: { $in: userIds } }, '-password').lean();
  const mapUser = _.reduce(users, (result, user) => {
    result[user._id] = user;
    return result;
  }, {});
  return userIds.map(userId => (mapUser[userId] || null));
});

module.exports = {
  userLoader,
};
