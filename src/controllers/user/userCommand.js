const bcrypt = require('bcrypt');
const { UserModel } = require('../../models');

const { encrypt: encryptConfig } = require('../../configs');
const { validate, validateAuth, validateUser, validatePassword } = require('../../validations');
const { MutationResponse } = require('../../graphql/types/MutationResponse');

async function login(parent, { email, password }) {
  try {
    const { error } = validateAuth({ email, password });
    if (error) throw new AppError(400, error.message);

    const user = await UserModel.findOne({ email }, 'password').lean();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError(404, 'Username or password not match');
    }
    return new MutationResponse('Accepted');
  } catch (error) {
    throw new AppError(500, error.message);
  }
}

async function createUser(parent, { name, email, password, repeatPassword }) {
  try {
    const { error } = validate(
      validateUser({ name, email }),
      validatePassword({ password, repeatPassword }),
    );
    if (error) throw new AppError(400, error.message);

    if (await UserModel.exists({ email })) {
      throw new AppError(400, 'Username or email is already used');
    }
    const hashPassword = await bcrypt.hash(password, encryptConfig.saltRound);
    await UserModel.create({ email, name, password: hashPassword });

    return new MutationResponse('Account created');
  } catch (error) {
    throw new AppError(500, error.message);
  }
}

module.exports = { login, createUser };
