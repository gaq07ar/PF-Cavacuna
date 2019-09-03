const devicesController = require('../controllers/device');
const express = require('express');
const router = express.Router();

router
    .get('/get', devicesController.get)
    .get('/get/:deviceId', devicesController.getById)
    .post('/create', devicesController.create)
    .put('/update', devicesController.update)
    .delete('/delete/id', devicesController.delete);

module.exports = router;