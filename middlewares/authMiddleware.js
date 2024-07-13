const Joi = require('joi');

// sign up authentication shema
const loginDetailsShema = Joi.object({
    username: Joi.string()
        .min(3) // Minimum length of 3 characters
        .required(),
    password: Joi.string()
        // Must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$'))
        .required(),
    email: Joi.string()
        .email() // Must be a valid email format
        .required()
});

module.exports = {loginDetailsShema};
