const Garden = require('../models/garden');

module.exports = {
    findAll: async (_, response) => {
        const garden = await Garden.findAll();
        response.json(garden)
    },

    findOne: async (request, response) => {
        const member_id = request.memberId
        const garden = await Garden.findOne(member_id);
        response.json(garden);
    },

    save: async (request, response) => {
        const garden = new Garden();
        try {
            await garden.save();
            response.status(201).json(garden);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    delete: async (request, response) => {
        const garden = new Garden(request.params.id);
        try {
            await garden.delete();
            response.status(201).json(garden);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },
};