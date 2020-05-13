const db = require('../config/db');

var parkMode = "CLOSED";
var parkController = {};

parkController.parkEntry = function (plateInfo) {
    var plateJSON = JSON.parse(plateInfo);

    var verifyPlateAccess = `
        SELECT *
        FROM parkdriver pd, vehicles v
        WHERE pd.plate = $1 AND v.plate = $1 AND v.access_park = TRUE`;

    var saveParkEntry = `
        INSERT INTO parkaccess (plate, date_in, date_out)
        VALUES ($1, $2, NULL)`;

    if (parkMode === "CLOSED") {
        db.query(verifyPlateAccess, [plateJSON['plate']], function (err, plateAccessQuery) {
            if (err) {
                console.log(err);
            } else {
                if (plateAccessQuery.rowCount > 0) {
                    db.query(saveParkEntry, [plateJSON['plate'], plateJSON['date']], function (err, saveEntryQuery) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Entrada no parque confirmada:", plateJSON['plate']);
                            console.log("Entrada no parque registada.");
                        }
                    });
                } else {
                    console.log("Não pode entrar no parque:", plateJSON['plate']);
                }
            }
        });
    } else {
        db.query(saveParkEntry, [plateJSON['plate'], plateJSON['date']], function (err, saveEntryQuery) {
            if (err) {
                console.log(err);
            } else {
                console.log("Entrada no parque confirmada:", plateJSON['plate']);
                console.log("Entrada no parque registada.");
            }
        });
    }
};

parkController.parkExit = function (plateInfo) {
    var plateJSON = JSON.parse(plateInfo);

    var saveParkExit = `
        UPDATE parkaccess
        SET date_out = $1
        WHERE plate = $2 AND date_out IS NULL`;

    db.query(saveParkExit, [plateJSON['date'], plateJSON['plate']], function (err, saveExitQuery) {
        if (err) {
            console.log(err);
        } else if (saveExitQuery.rowCount > 0) {
            console.log("Saída do parque regsitada:", plateJSON['plate']);
        } else {
            console.log("Saída não registada, matrícula não encontrada:", plateJSON['plate']);
        }
    });
};

parkController.setParkMode = function (req, res) {
    var pMode = req.body.parkMode;

    if (pMode === "OPEN") {
        parkMode = pMode;
    } else {
        parkMode = "CLOSED";
    }

    res.json({
        parkMode: parkMode
    });
};

parkController.getParkMode = function (req, res) {
    res.json({
        parkMode: parkMode
    });
};

module.exports = parkController;