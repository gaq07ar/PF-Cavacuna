const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const DeviceUserEntity = sequelize.define('device_user_entity', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = DeviceUserEntity;
