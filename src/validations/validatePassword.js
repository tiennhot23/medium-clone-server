const Joi = require('joi');
const { user: userConst } = require('../configs/validation');

function validatePassword({ password, repeatPassword }) {
  const joiSchema = Joi.object({
    password: Joi.string()
      .pattern(userConst.passwordRegex),
    repeatPassword: Joi.valid(Joi.ref('password'))
      .required().label('Confirm password')
      .messages({ 'any.only': '{#label} does not match' }),
  }).with('password', 'repeatPassword');

  return joiSchema.validate({ password, repeatPassword });
}

module.exports = validatePassword;
