const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.get('/get-all', usersController.getAllUsers);

router.get('/by-id', usersController.getUserById);

router.post('/create', usersController.createUser);

router.put('/update/id', usersController.updateUser);

router.delete('/delete/id', usersController.updateUser);

module.exports = router;