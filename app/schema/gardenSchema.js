const Joi = require('joi');

const schema = Joi.object({
    member_id: Joi.number().required().integer().min(1).required()
});

module.exports = schema;