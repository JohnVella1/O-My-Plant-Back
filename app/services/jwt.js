const JWT = require('jsonwebtoken');

module.exports = {
    // Création du token
    makeToken: memberId => {
        try {
            return JWT.sign({
                    data: memberId
                },
                process.env.JWT_SECRET, {
                    algorithm: 'HS256',
                    expiresIn: '60m'
                }
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    //  Validation du token
    validateToken: token => {
        try {
            return JWT.verify(
                token,
                process.env.JWT_SECRET, {
                    algorithms: ['HS256']
                }
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}