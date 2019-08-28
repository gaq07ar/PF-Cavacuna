const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Storage = sequelize.define('storage', {
    slot: {
        type: Sequelize.SMALLINT,
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
    // Implementation note:
    // When a new vaccine is added executes a trigger that
    // adds a new registry to storage-registry
    // with: slot, device_id and vaccine_id
    // --> go for comments in storage-registry.js
    vaccine_id: {
        type: Sequelize.STRING(50),
        references: {
            model: 'vaccine',
            key: 'id'
        }
    },
    related_storage_registry: {
        type: Sequelize.BIGINT,
        references: {
            model: 'storage_registry',
            key: 'id'
        }
    },
    // Implementation note:
    // When is_applied is set to true then execute trigger to update the registry in
    // storage_registry with id related_storage_registry, just the column departure_date with Sequelize.NOW
    // then update in this table setting: 
    //      is_applied to false 
    //      related_storage_registry to null
    //      vaccine_id to null
    // meaning this that the storage is now empty
    is_applied: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Storage;
