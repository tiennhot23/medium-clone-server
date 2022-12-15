const Joi = require('joi');

function validateAuth({ email, password }) {
  const joiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return joiSchema.validate({ email, password });
}

module.exports = validateAuth;
