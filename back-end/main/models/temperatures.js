const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Temperatures = sequelize.define('temperatures', {
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        primaryKey: true
    },
    device_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'device',
            key: 'id'
        },
        primaryKey: true
    },
    temperature: Sequelize.DECIMAL(5, 2)
});

module.exports = Temperatures;
