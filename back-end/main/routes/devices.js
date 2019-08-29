const devicesController = require('../controllers/devices');
const express = require('express');
const router = express.Router();

router.get('/get', devicesController.get);

router.get('/get/:deviceId', devicesController.getById);

//The query to this method should be like:
//localhost:3000/api/devices/create?name=heladera&description=descripcion
router.post('/create', devicesController.create);

router.put('/update', devicesController.update);

router.delete('/delete/id', devicesController.delete);

module.exports = router;