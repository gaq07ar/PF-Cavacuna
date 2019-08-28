const { devDefaultMinTemp, devDefaultMaxTemp } = require('../util/config');
const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Device = sequelize.define('device', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    slots_amount: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    monitored_mode: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
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

module.exports = Device;
