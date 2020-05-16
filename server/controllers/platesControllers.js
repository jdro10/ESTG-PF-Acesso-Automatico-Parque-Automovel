var amqp = require('amqplib/callback_api');
var park = require('../controllers/parkController');

var platesController = {};
var ch = null;

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, channel) {
       ch = channel;
    });
 });

platesController.entries = amqp.connect('amqp://localhost', function (err, connection) {
    if (err) {
        console.log(err);
    } else {
        connection.createChannel(function (err, channel) {
            if (err) {
                console.log(err);
            } else {
                var entryQueue = 'entry_queue';

                channel.assertQueue(entryQueue, {
                    durable: false
                });

                channel.consume(entryQueue, function (msg) {
                    park.parkEntry(msg.content.toString());
                }, {
                    noAck: true
                });
            }
        });
    }
});

platesController.exits = amqp.connect('amqp://localhost', function (err, connection) {
    if (err) {
        console.log(err);
    } else {
        connection.createChannel(function (err, channel) {
            if (err) {
                console.log(err);
            } else {
                var exitQueue = 'exit_queue';

                channel.assertQueue(exitQueue, {
                    durable: false
                });

                channel.consume(exitQueue, function (msg) {
                    park.parkExit(msg.content.toString());
                }, {
                    noAck: true
                });
            }
        });
    }
});

function toqueue(queueName, data){
    ch.sendToQueue(queueName, new Buffer(data));
};

module.exports.toqueue = toqueue;