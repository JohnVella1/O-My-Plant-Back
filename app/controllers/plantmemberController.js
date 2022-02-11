const Plantmember = require('../models/plantmember');
const Member = require('../models/member');
const Garden = require('../models/garden');
const {
    cloudinary
} = require('../cloudinary/index');

module.exports = {
    findAll: async (_, response) => {
        const plantmember = await Plantmember.findAll();
        response.json(plantmember)
    },
    findOne: async (request, response) => {
        const plant_id = parseInt(request.params.id, 10);
        const plantmember = await Plantmember.findOne(plant_id);
        response.json(plantmember);
    },
    save: async (request, response) => {
        // UPDATE || CREATION d'une plante.
        const newPlantMemberProperties = request.body;
        const plant_id = request.params.id;
            try {
                if (newPlantMemberProperties.photo_member) {
                    console.log("Je suis passé par ici")
                    try {
                        //  UPLOAD de l'image sur Cloudinary
                        const {
                            secure_url
                        } = await cloudinary.uploader.upload(newPlantMemberProperties.photo_member, {
                            upload_preset: "user-plant",
                        });
                        newPlantMemberProperties.photo_member = secure_url;
                        console.log('JE SUIS UNE IMAGE', secure_url);
                    } catch (error) {
                        console.log(error);
                    }
                };
                const plantMember = await Plantmember.findOne(plant_id)
                    if (plantMember !== []) {
                        try {
                            // Suppression de l'image sur Cloudinary
                            let url = plantMember[0].photo_member.split("/");
                            let public_id = url.slice(url.length - 2, url.length).join("/").split(".")[0];
                            const result = await cloudinary.uploader.destroy(public_id, {
                                invalidate: true,
                                resource_type: "image"
                            });
                            console.log(result);
                        } catch (error) {
                            console.log(error.message);
                        }
                    };

                const updatedPlantMember = {
                    ...plantMember,
                    ...newPlantMemberProperties
                };

                const instance = new Plantmember(updatedPlantMember);
                await instance.save();
                response.status(201).json(updatedPlantMember);
            } catch (error) {
                response.status(500).json(error.message);
            }
    },
    delete: async (request, response) => {
        const id = request.params.id;
        try {
            const plantMember = await Plantmember.findOne(id)
            // Suppression de l'image sur Cloudinary
            if (plantMember[0].photo_member) {
                let url = plantMember[0].photo_member.split("/");
                let public_id = url.slice(url.length - 2, url.length).join("/").split(".")[0];
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
            await Plantmember.deletePlant(id);
            response.status(201).json({
                msg: 'La plante a bien été supprimée!'
            });
        } catch (error) {
            response.status(500).json(error.message);
        }
    },
    findAllPlantByGarden: async (request, response) => {
        const garden = await Garden.findOne(request.memberId)
        const plantmember = await Plantmember.findAllPlantByGarden(garden.id);
        response.json(plantmember);
    },
};