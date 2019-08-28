const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    dbPassword: process.env.CAVACUNA_DB_SERVER_PW,
    dbSchema: process.env.CAVACUNA_DB_DEF_SCHEMA,
    dbUser: process.env.CAVACUNA_DB_USER,
    devDefaultMinTemp: process.env.DEVICE_MIN_TEMP_DEFAULT,
    devDefaultMaxTemp: process.env.DEVICE_MAX_TEMP_DEFAULT
};