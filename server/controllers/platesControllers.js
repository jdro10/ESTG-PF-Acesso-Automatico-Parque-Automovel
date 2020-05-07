var amqp = require('amqplib/callback_api');
var park = require('../controllers/parkController');

amqp.connect('amqp://localhost', function (err, connection) {
    if (err) {
        console.log(err);
    } else {
        connection.createChannel(function (err, channel) {
            if (err) {
                console.log(err);
            } else {
                var queue = 'plates_queue';

                channel.assertQueue(queue, {
                    durable: false
                });

                channel.consume(queue, function (msg) {
                    park.parkEntrance(msg.content.toString());
                }, {
                    noAck: true
                });
            }
        });
    }
});