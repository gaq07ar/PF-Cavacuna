// API Requirements
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const devices = require('./routes/devices');
const users = require('./routes/users');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// DB Requirements
const DeviceUserEntity = require('./models/device-user-entity');
const StorageRegistry = require('./models/storage-registry');
const ReportsSended = require('./models/reports-sended');
const VaccineGroups = require('./models/vaccine-groups');
const Temperatures = require('./models/temperatures');
const AlarmTypes = require('./models/alarm-types');
const EntityData = require('./models/entity-data');
const UserData = require('./models/user-data');
const Vaccine = require('./models/vaccine');
const Storage = require('./models/storage');
const Reports = require('./models/reports');
const Entity = require('./models/entity');
const Alarms = require('./models/alarms');
const Device = require('./models/device');
const User = require('./models/user');


// API Routes
app.use('/api/devices', devices);
app.use('/api/users', users);
app.use(errorController.get404);

// DB Configuration
Entity.belongsToMany(Device, { through: DeviceUserEntity, foreignKey: 'entity_id' });
Device.belongsToMany(User, { through: DeviceUserEntity, foreignKey: 'user_id' });
User.belongsToMany(Device, { through: DeviceUserEntity, foreignKey: 'device_id' });
StorageRegistry.belongsTo(Vaccine, { foreignKey: 'vaccine-id' });
StorageRegistry.belongsTo(Device, { foreignKey: 'device-id' });
Vaccine.belongsTo(VaccineGroups, { foreignKey: 'vaccine_group_id' });
Entity.belongsTo(EntityData, { foreignKey: 'entity_data_id' });
Alarms.belongsTo(AlarmTypes, { foreignKey: 'alarm_type_id' });
Alarms.belongsTo(Device, { foreignKey: 'device_id' });
User.belongsTo(UserData, { foreignKey: 'user_data_id' });

// Starting API
sequelize.sync()
    .then((result) => {
        console.log('Connection to DB successful');
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
