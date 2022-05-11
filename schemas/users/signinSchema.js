const Joi = require('joi');

const signinSchema = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(4).required(),
});

module.exports = signinSchema;
