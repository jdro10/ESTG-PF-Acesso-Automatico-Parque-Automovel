const db = require('../config/db');

var parkMode = "CLOSED";
var parkController = {};

parkController.parkEntrance = function (plateInfo) {
    var plateJson = JSON.parse(plateInfo);

    var checkAccess = `
        SELECT *
        FROM parkDriver pd, cars c
        WHERE pd.plate = $1 AND c.plate = $1 AND c.access_park = TRUE`;

    var saveEntry = `
        INSERT INTO parkaccess (
            plate,
            date_in,
            date_out
        ) VALUES (
            $1,
            $2,
            NULL
        )`;

    if (parkMode === "CLOSED") {
        db.query(checkAccess, [plateJson['detected_plates']], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result.rowCount > 0) {
                    console.log("Entrada no parque confirmada", plateJson['detected_plates']);

                    db.query(saveEntry, [plateJson['detected_plates'], plateJson['date']], function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Entrada no parque registada.");
                        }
                    });
                } else {
                    console.log("Não pode entrar no parque...", plateJson['detected_plates']);
                }
            }
        });
    } else {
        console.log("Entrada no parque confirmada", plateJson['detected_plates']);

        db.query(saveEntry, [plateJson['detected_plates'], plateJson['date']], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Entrada no parque registada.");
            }
        });
    }
};

parkController.parkExit = function (plateInfo) {
    var plateJson = JSON.parse(plateInfo);

    var savePlateExit = `
        UPDATE parkaccess
        SET date_out = $1, time_out = $2
        WHERE plate = $3 AND date_out IS NULL AND time_out IS NULL`;

    db.query(savePlateExit, [plateJson['date'], plateJson['detected_plates']], function (err, res) {
        if (err) {
            console.log(err);
        } else {
            if (res.rowCount > 0) {
                console.log("Saída registada com sucesso.", plateJson['detected_plates']);
            } else {
                console.log("Saída não registada, matrícula não se encontra no parque.");
            }
        }
    });
};

parkController.changeParkMode = function (req, res) {
    var pMode = req.body.parkMode;

    if (pMode === "OPEN") {
        parkMode = pMode;
    } else {
        parkMode = "CLOSED";
    }

    res.json({ parkMode: parkMode });
};

parkController.getParkMode = function (req, res) {
    res.json({ parkMode: parkMode });
};

module.exports = parkController;