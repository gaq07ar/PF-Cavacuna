const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Reports = sequelize.define('reports', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    device_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
        references: {
            model: 'device',
            key: 'id'
        }
    },
    times: {
        type: Sequelize.JSON,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
});

module.exports = Reports;
