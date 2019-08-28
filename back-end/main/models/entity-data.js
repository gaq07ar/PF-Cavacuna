const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const EntityData = sequelize.define('entity_data', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    phone: Sequelize.STRING(100)
});

module.exports = EntityData;