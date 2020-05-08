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
            date_in,
            time_in,
            date_out,
            time_out
        ) VALUES (
            $1,
            $2,
            $3,
            NULL,
            NULL
        )`;

    db.query(checkAccess, [plateJson['detected_plates']], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.rowCount > 0) {
                console.log("Entrada no parque confirmada", plateJson['detected_plates']);
                db.query(saveEntry, [plateJson['detected_plates'], plateJson['day'], plateJson['hour']], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Entrada no parque registada.");
                    }
                })
            } else {
                console.log("Não pode entrar no parque...", plateJson['detected_plates']);
            }
        }
    });
}

parkController.parkExit = function (plateInfo) {
    var plateJson = JSON.parse(plateInfo);

    var savePlateExit = `
        UPDATE parkaccess
        SET date_out = $1, time_out = $2
        WHERE plate = $3 AND date_out IS NULL AND time_out IS NULL`;
    
    db.query(savePlateExit, [plateJson['day'], plateJson['hour'], plateJson['detected_plates']], function(err, res){
        if (err) {
            console.log(err);
        } else {
            if(res.rowCount > 0){
                console.log("Saída registada com sucesso.", plateJson['detected_plates']);
            } else{
                console.log("Saída não registada, pois o veículo nao se encontrava dentro do parque.");
            }
        }
    });

    /*
    db.query(searchPlateEntry, [plateJson['detected_plates']], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.rowCount > 0) {
                console.log("Saída do parque confirmada", plateJson['detected_plates']);

                db.query(savePlateExit, [plateJson['day'], plateJson['hour']], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Saída do parque registada.");
                    }
                })
            } else {
                console.log("Não pode sair do parque...", plateJson['detected_plates']);
            }
        }
    });
    */
}

module.exports = parkController;