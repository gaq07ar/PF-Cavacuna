const { devDefaultMinTemp, devDefaultMaxTemp } = require('../util/config');
const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const VaccineGroups = sequelize.define('vaccine_groups', {
    id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    min_temp: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: devDefaultMinTemp
    },
    max_temp: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: devDefaultMaxTemp
    }
});

module.exports = VaccineGroups;
