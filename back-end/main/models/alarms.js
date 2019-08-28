const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Alarms = sequelize.define('alarms', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
});

module.exports = Alarms;

// The controller receives an http post request that knows what kind of error is,
// Arduino will send 1 if temperature it's <= 2, 2 if it's >= 8
// If reading from chanel status null then it's turned off
// If it's forced by user, send the user {$username} has triggered the alarm for reasons: {$reasons}