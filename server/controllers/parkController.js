const db = require('../config/db');

var parkController = {}

parkController.parkEntrance = function (plateInfo) {
    var plateJson = JSON.parse(plateInfo);

    var checkPlateExists = `
        SELECT plate
        FROM parkDriver
        WHERE plate = $1`;

    var checkIn = `
        INSERT INTO parkaccess (
            plate,
            date_in,
            date_out
        ) VALUES (
            $1,
            $2,
            NULL
        )`;

    db.query(checkPlateExists, [plateJson['detected_plates']], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.rowCount > 0) {
                console.log("Entrada no parque confirmada");
                db.query(checkIn, [plateJson['detected_plates'], plateJson['time']], function(err, result){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("Entrada no parque registada.");
                    }
                })
            } else if (result.rowCount == 0) {
                console.log("Não pode entrar no parque...");
            }
        }
    });
}

module.exports = parkController;