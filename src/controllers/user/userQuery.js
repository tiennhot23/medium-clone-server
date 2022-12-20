const { UserModel } = require('../../models');

async function getUser(parent, { userId }, { caching }) {
  const cachedUser = JSON.parse(await caching.call('get', userId));
  if (!cachedUser) {
    const user = await UserModel.findById(userId, '-password -follower -following').lean();
    if (!user) {
      throw new AppError(404, 'Can\'t find this user');
    }
    await caching.callType('user', 'set', userId, user);
    return user;
  }
  return cachedUser;
}

module.exports = { getUser };
