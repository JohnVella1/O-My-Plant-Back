const db = require('../database');
const Member = require('../models/member');
const Garden = require('../models/garden')
const jwt = require('../services/jwt');
const {
    cloudinary
} = require('../cloudinary/index');



module.exports = {
    //Crée un compte et son jardin associé
    subscribe: async (request, response) => {
        try {
            const member = await new Member(request.body).memberSave();
            response.status(200).json(member);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    //Connexion au compte
    login: async (request, response) => {
        try {
            const member = await new Member(request.body).doLogin();
            const token = jwt.makeToken(member.id);
            if (member) {
                response.setHeader('Authorization', token);
                response.status(200).json(member);
            } else {
                console.log('<< 401 UNAUTHORIZED');
                response.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    // Vérification du token de l'utilisateur
    verifyToken: async (request, response) => {
        const authorization = request.headers.authorization;
        const token = authorization.split(" ")[1];
        try {
            const decodedToken = await jwt.validateToken(token);
            const member = await Member.findOne(decodedToken.data);
            if (!member)
                return response
                    .status(404)
                    .json(`No member found with id ${decodedToken.data}`);
            response.json(member);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    // Update de l'utilisateur
    save: async (request, response) => {
        const newMemberProperties = request.body;
        try {
            const connectedMember = await Member.findOne(request.memberId);
            console.log(connectedMember)
            // UPLOAD DE LA PHOTO SUR CLOUDINARY
            if (newMemberProperties.profilepicture) {
                try {
                    const {
                        secure_url
                    } = await cloudinary.uploader.upload(newMemberProperties.profilepicture, {
                        upload_preset: "user-profile",
                    });
                    newMemberProperties.profilepicture = secure_url;
                    console.log('JE SUIS UNE IMAGE', secure_url);
                } catch (error) {
                    console.log(error);
                }
            };

            if (connectedMember.profilepicture) {
                let url = connectedMember.profilepicture.split("/");
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
            };

            const updatedMember = {
                ...connectedMember,
                ...newMemberProperties,
            };

            const instance = new Member(updatedMember);
            await instance.save();
            response.status(200).json(updatedMember);
        } catch (error) {
            response.status(400).json({});
        }
    },
    getInfos: (request, response) => {
        try {
            const infos = {
                message: 'Ceci est un message obtenu après vérif de qui a fait la requête'
            };
            response.setHeader('Authorization', jwt.makeToken(request.userId));
            response.status(200).json(infos);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    // ADMIN: Trouve tous les comptes
    findAll: async (_, response) => {
        try {
            const members = await Member.findAll();
            response.json(members);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    // ADMIN: Retrouve un membre par son ID 
    findOne: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const member = await Member.findOne(id);
            if (!member)
                return response.status(404).json(`No member found with id ${id}`);
            response.json(member);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    // Supression du membre
    delete: async (request, response) => {
        try {
            const id = request.memberId;
            const member = await Member.findOne(id)
            console.log(member);
            if(member.profilepicture !== null){
                let url = member.profilepicture.split("/");
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
                
            await Member.deleteMember(id);
            response.status(204).json({msg: "L'utilisateur a bien été supprimé."});
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }
};