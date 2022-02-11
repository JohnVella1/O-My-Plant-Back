const db = require('../database');
const Plantdb = require('../models/plantdb');
const {
    cloudinary
} = require('../cloudinary/index');

module.exports = {
    findAll: async (_, response) => {
        const plant = await Plantdb.findAll();
        response.json(plant)
    },
    findOne: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const plant = await Plantdb.findOne(id);
        response.json(plant);
    },
    save: async (request, response) => {
        const newPlantdbProperties = request.body;
        try {
            if (newPlantdbProperties.photo) {
                try {
                    const {
                        secure_url
                    } = await cloudinary.uploader.upload(newPlantdbProperties.photo, {
                        upload_preset: "bdd-plant",
                    });
                    newPlantdbProperties.photo = secure_url;
                } catch (error) {
                    console.log(error);
                }
            };
            const instance = new Plantdb(newPlantdbProperties);
            await instance.save();
            response.status(201).json(newPlantdbProperties);
        } catch (error) {
            console.log(error.message)
            response.status(500).json(error.message);
        }
    },
    delete: async (request, response) => {
        const id = request.params.id
        try {
            const plantdb = await Plantdb.findOne(request.params.id)

            if (plantdb.photo) {
                let url = plantdb.photo.split("/");
                    let public_id = url.slice(url.length-2, url.length).join("/").split(".")[0];
                try {
                    const result = await cloudinary.uploader.destroy(public_id, {
                        invalidate: true,
                        resource_type: "image"
                    });
                    console.log(result);
                } catch (error) {
                    console.log(error.message);
                }
            }
            await Plantdb.deletePlant(id);
            response.status(201).json({msg:'La plante a bien été supprimée!'});
        } catch (error) {
            response.status(500).json(error.message);
        }
    },
    count: async (_, response) => {
        const plantCount = await Plantdb.count();
        response.json(plantCount)
    },
};