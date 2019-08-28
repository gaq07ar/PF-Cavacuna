const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Vaccine = sequelize.define('vaccine', {
    id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    description: Sequelize.TEXT
});

module.exports = Vaccine;