const Joi = require('joi');

const username = Joi.string().min(3).required();
const password = Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$'))
    .required();
const email = Joi.string().email().required();

// Signup validation schema
const signupDetailsSchema = Joi.object({
    username,
    password,
    email
});

module.exports = { signupDetailsSchema };
