const Device = require('../models/device');
var schedule = require('node-schedule');

exports.get = (req, res, next) => {
    Device.findAll()
        .then(devices => {
            if (devices !== null) {
                res.json(devices);
            } else {
                res.send({
                    err: 'there are no devices in db'
                });
            }
        })
        .catch(err => {
            console.log(err);
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
            console.log(err);
        });
}

exports.create = (req, res, next) => {
    console.log('On create device');
    const deviceName = req.query.name;
    const deviceDescription = req.query.description;
    Device.create({
        name: deviceName,
        description: deviceDescription
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
}

exports.update = (req, res, next) => {
    const deviceId = req.params.deviceId;
    console.log('Updating device with Id number ' + deviceId);
}

exports.delete = (req, res, next) => {
    console.log('On delete device');
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