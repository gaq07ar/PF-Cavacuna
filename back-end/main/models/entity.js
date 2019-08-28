const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Entity = sequelize.define('entity', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Entity;