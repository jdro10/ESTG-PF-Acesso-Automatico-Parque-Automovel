const db = require('../config/db');
var plates = require('../controllers/platesControllers');

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
                            plates.accessResponse("entry_queue_p", "allowed");
                            console.log("Entrada no parque confirmada:", plateJSON['plate']);
                        }
                    });
                } else {
                    plates.accessResponse("entry_queue_p", "denied");
                    console.log("Entrada no parque negada:", plateJSON['plate']);
                }
            }
        });
    } else {
        db.query(saveParkEntry, [plateJSON['plate'], plateJSON['date']], function (err, saveEntryQuery) {
            if (err) {
                console.log(err);
            } else {
                plates.accessResponse("entry_queue_p", "allowed");
                console.log("Entrada no parque confirmada:", plateJSON['plate']);
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
            plates.accessResponse("exit_queue_p", "allowed");
            console.log("Saída do parque registada:", plateJSON['plate']);
            
        } else {
            plates.accessResponse("exit_queue_p", "denied");
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