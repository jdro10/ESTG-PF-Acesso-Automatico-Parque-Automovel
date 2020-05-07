const db = require('../config/db');

var parkController = {};

parkController.parkEntrance = function (plateInfo) {
    var plateJson = JSON.parse(plateInfo);

    var checkAccess = `
        SELECT plate
        FROM parkDriver
        WHERE plate = $1`;

    var saveEntry = `
        INSERT INTO parkaccess (
            plate,
            date_in
        ) VALUES (
            $1,
            $2
        )`;

    db.query(checkAccess, [plateJson['detected_plates']], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.rowCount > 0) {
                console.log("Entrada no parque confirmada", plateJson['detected_plates']);
                db.query(saveEntry, [plateJson['detected_plates'], plateJson['time']], function(err, result){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("Entrada no parque registada.");
                    }
                })
            } else {
                console.log("Não pode entrar no parque...", plateJson['detected_plates']);
            }
        }
    });
}

module.exports = parkController;