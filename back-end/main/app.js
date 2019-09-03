// Documentation Requirements
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Security Requirements
const helmet = require('helmet');

// API Requirements
const errorController = require('./controllers/error');
const expressValidator = require('express-validator');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const device = require('./routes/device');
const users = require('./routes/users');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

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

// Documentation Configuration
const swaggerDefinition = {
    info: {
        title: 'Cavacuna API documentation',
        version: '0.1.0',
        description: 'Endpoints to test API routes',
    },
    host: 'localhost:3000',
    basePath: '/api/',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Security Configuration
const whitelist = [
    'http://localhost:3031',
    'http://localhost:3000',
    'http://localhost:3003',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

// API Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(expressValidator());
app.use(helmet());

// API Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', device);
app.use('/api/users', users);
app.use(errorController.get404);
app.use(cors(corsOptions));

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
