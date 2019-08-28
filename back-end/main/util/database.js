const Sequelize = require('sequelize').Sequelize;
const { dbSchema, dbUser, dbPassword } = require('../util/config');

const sequelize = new Sequelize(dbSchema, dbUser, dbPassword, {
    dialect: 'postgres',
    host: 'localhost',
    define: {
        underscored: true,
        freezeTableName: true
    }
});

module.exports = sequelize;