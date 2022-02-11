const {
    Pool
} = require('pg');
const config = {
    connectionString: process.env.DATABASE_URL
}


if (process.env.NODE_ENV === 'production') {
    //je suis sur l'environnement de héroku, je dois adapter ma config
    config.ssl = {
        rejectUnauthorized: false
    };
}


const pool = new Pool(config);

module.exports = pool;