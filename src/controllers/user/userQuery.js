const { UserModel } = require('../../models');

async function getUser(parent, { email }) {
  try {
    const user = await UserModel.findOne({ email }, '-password').lean();
    if (!user) {
      throw new AppError(404, 'Can\'t find this user');
    }
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    else throw new AppError(500, error.message);
  }
}

module.exports = { getUser };
