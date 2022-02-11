const Joi = require('joi');


const schema = Joi.object({
    pseudo: Joi.string().required(),
    firstname: Joi.string().allow(null),
    lastname: Joi.string().allow(null),
    dateofbirth: Joi.string().allow(null),
    telephone: Joi.string().allow(null),
    mail: Joi.string().required(),
    profilepicture: Joi.string().allow(null),
    biography: Joi.string().allow(null),
    counter: Joi.number().allow(null),
    level: Joi.string().allow(null),
    role: Joi.string().allow(null),
});

module.exports = schema;
