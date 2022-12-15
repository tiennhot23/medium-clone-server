const Joi = require('joi');

function validateUser({ name, email }) {
  const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
  });

  return joiSchema.validate({ name, email });
}

module.exports = validateUser;
