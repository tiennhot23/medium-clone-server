const { UserModel } = require('../../models');

async function getUser(parent, { userId }, { redis }) {
  const cachedUser = JSON.parse(await redis.get(userId));
  if (!cachedUser) {
    const user = await UserModel.findById(userId, '-password -follower -following').lean();
    if (!user) {
      throw new AppError(404, 'Can\'t find this user');
    }
    await redis.set(userId, JSON.stringify(user));
    return user;
  }
  return cachedUser;
}

module.exports = { getUser };
