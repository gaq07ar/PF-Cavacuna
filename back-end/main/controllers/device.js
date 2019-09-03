const Device = require('../models/device');
//var schedule = require('node-schedule');


/**
 * @swagger
 * /registerUser:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User created
 *       '403':
 *         description: Username or email already taken
 */

exports.get = (req, res, next) => {
    Device.findAll()
        .then(devices => {
            if (devices.length > 0) {
                res.json(devices);
            } else {
                res.send({
                    err: 'there are no devices in db'
                });
            }
        })
        .catch(err => {
            res.send(err);
        });
    console.log('On get list of devices');
};

exports.getById = (req, res, next) => {
    const deviceId = req.params.deviceId;
    Device.findByPk(deviceId)
        .then(device => {
            if (device !== null) {
                res.json(device);
            } else {
                res.send({
                    err: 'device not found'
                });
            }
        })
        .catch(err => {
            res.send(err);
        });
}

exports.create = (req, res, next) => {
    const device = {
        id: req.body.id,
        slots_amount: req.body.slots_amount,
        description: req.body.description,
    }
    Device.create(device)
        .then(result => res.json(result))
        .catch(err => res.send(err));

    // console.log('On create device');
    // const slotsAmount = req.query.slots;
    // const monitoredMode = req.query.isMonitored;
    // const description = req.query.description;
    // Device.create({
    //     slots_amount: slotsAmount,
    //     monitored_mode: monitoredMode,
    //     description: description
    // }).then(result => {
    //     res.json(result);
    // }).catch(err => {
    //     res.send(err);
    // });
}

exports.update = (req, res, next) => {
    /*const deviceId = req.params.deviceId;
    const slotsAmount = req.query.slots;
    const monitoredMode = req.query.isMonitored;
    const description = req.query.description;
    Device.update({
        slots_amount: slotsAmount,
        monitored_mode: monitoredMode,
        description: description
    }, id = deviceId).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
    console.log('Updating device with Id number ' + deviceId);*/
}

exports.delete = (req, res, next) => {
    console.log('On delete device');
}

exports.validate = (method) => {

    switch (method) {
        case 'create': {
            return [
                body('id', 'id must exist').exists(),
                body('slots_amount', 'slots_amount must exist').exists(),
                body('description', 'description must exist').exists(),
                body('min_temp').optional().isInt(),
                body('max_temp').optional().isInt()
            ]
        }
    }
}

/*
let times = [
    {hour: 5, minute: 45},
    {hour: 6, minute: 30},
    {hour: 11, minute: 15}
  ];
  times.forEach(function(time) {
    var j = schedule.scheduleJob(time, function() {
      // your job
      console.log('Time for tea!');
    });
  })

const j = schedule.scheduleJob({  }, function () {
    console.log('The answer to life, the universe, and everything!');
});
*/