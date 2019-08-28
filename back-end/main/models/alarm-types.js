const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const AlarmTypes = sequelize.define('alarm_types', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cause: Sequelize.STRING(100),
    description: Sequelize.STRING(100)
});

module.exports = AlarmTypes;