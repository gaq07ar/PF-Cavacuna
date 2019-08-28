const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const StorageRegistry = sequelize.define('storage_registry', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    // When a new register is added it means that a vaccine is added to the storage
    addmision_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    // When a vaccine is applied then the departure_date is updated
    slot: Sequelize.SMALLINT,
    departure_date: Sequelize.DATE
});
// Implementation note:
// When a new record is created execute a trigger that update
// the record in storage that has slot, device_id with last_registry_added = id
// --> go for comments in storage.js

module.exports = StorageRegistry;
