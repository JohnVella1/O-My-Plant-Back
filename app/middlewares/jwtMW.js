const jwt = require('../services/jwt');

// Middleware qui permet de vérifier le token de l'utilisateur, sur chaque route.
module.exports = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        const token = authorization.split(" ")[1];
        console.log(request)
        console.log(token);
        if (!token) {
            return response.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        console.log(payload);
        if (!payload.data) {
            return response.status(401).json('Invalid token');
        }
        request.memberId = payload.data;
        next();
    } catch (error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}