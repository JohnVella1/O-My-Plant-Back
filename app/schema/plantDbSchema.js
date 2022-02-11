const Joi = require('joi');

const schema = Joi.object({
    commonname: Joi.string().required(),
    photo: Joi.string().required(),
    description: Joi.string().required(),
    dateadded: Joi.number().required(),
    member_id: Joi.number().required().integer().min(1).required()
});

module.exports = schema;