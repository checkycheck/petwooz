const Joi = require('@hapi/joi');


const login = Joi.object({
    id: Joi.string()
        .required(),
    password: Joi.string()
        .trim()
        .required()
})

const register = Joi.object({
    fullName: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
        .min(3)
        .email({minDomainSegments: 2})
        .required(),
    phone: Joi.string()
        .required(),
    password: Joi.string()
        .trim()
        .min(5)
        .max(50)
        .required(),
    address: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    userType: Joi.string()
});





const Validator = {
    login,
    register
}

module.exports = Validator
