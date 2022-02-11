const Joi = require('joi');

const schema = Joi.object({
    nickname: Joi.string(),
    wateringfrequency: Joi.string(),
    numberoftimes: Joi.number(),
    reppoting: Joi.string(),
    trimming: Joi.string(),
    exposure: Joi.string(),
    site: Joi.string(),
    photo_member: Joi.string(),
    plantdb_id: Joi.number().required().integer().min(1).required(),
    garden_id: Joi.number().required().integer().min(1).required()
});

module.exports = schema;