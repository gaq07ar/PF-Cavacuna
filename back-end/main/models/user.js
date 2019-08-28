const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    is_admin: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = User;