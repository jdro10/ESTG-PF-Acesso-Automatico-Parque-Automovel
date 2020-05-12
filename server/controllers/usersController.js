const db = require('../config/db');

var userController = {};

var rollback = function (db) {
    db.query('ROLLBACK');
};

userController.create = function (req, res, next) {
    var userInfo = {
        number: req.body.number,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        plate: req.body.plate,
        car_brand: req.body.car_brand,
        car_model: req.body.car_model
    };

    var queryUser = `
        INSERT INTO users (
            number,
            firstName,
            lastName
        ) VALUES (
            $1,
            $2,
            $3
        )`;

    var queryCar = `
        INSERT INTO cars (
            plate,
            car_brand,
            car_model,
            access_park
        ) VALUES (
            $1,
            $2,
            $3,
            TRUE
        )`;

    var queryParkDriver = `
        INSERT INTO parkDriver(
            number,
            plate
        ) VALUES (
            $1,
            $2
        )`;

    db.query(queryUser, [userInfo.number, userInfo.firstName, userInfo.lastName], function (err, resUser) {
        if (err) {
            rollback(db);
            res.json({
                error: "Número de utilizador já existente."
            });
        } else {
            db.query(queryCar, [userInfo.plate, userInfo.car_brand, userInfo.car_model], function (err, resCar) {
                if (err) {
                    rollback(db);
                    res.json({
                        error: "Matrícula já existente."
                    });
                } else {
                    db.query(queryParkDriver, [userInfo.number, userInfo.plate], function (err, resDriver) {
                        if (err) {
                            rollback(db);
                            res.json({
                                error: "Ocorreu um erro."
                            });
                        } else {
                            res.json({
                                user: userInfo
                            });
                        }
                    });
                }
            });
        }
    });
};

userController.updateUserCar = function (req, res, next) {
    var userNumber = req.body.number;

    var carInfo = {
        plate: req.body.plate,
        car_brand: req.body.car_brand,
        car_model: req.body.car_model
    };

    var queryUserPlate = `
        SELECT plate
        FROM parkdriver
        WHERE number = $1`;

    var queryCar = `
        INSERT INTO cars (
            plate,
            car_brand,
            car_model,
            access_park
        ) VALUES (
            $1,
            $2,
            $3,
            TRUE
        )`;

    var queryUpdateUserPlate = `
        INSERT INTO parkdriver(
            number,
            plate
        ) VALUES (
            $1,
            $2
        )`;

    var queryPlateParkAcess = `
        UPDATE cars
        SET access_park = FALSE
        WHERE plate = $1 AND access_park = TRUE`;

    db.query(queryCar, [carInfo.plate, carInfo.car_brand, carInfo.car_model], function (err, resCar) {
        if (err) {
            rollback(db);
            res.json({
                error: "Matrícula já existente."
            });
        } else {
            db.query(queryUserPlate, [userNumber], function (err, resUser) {
                if (err) {
                    rollback(db);
                    res.json({
                        error: "Número já existente."
                    });
                } else {
                    for (var i = 0; i < resUser.rows.length; i++) {
                        db.query(queryPlateParkAcess, [resUser.rows[i]['plate']], function (err, resPlate) {
                            if (err) {
                                rollback(db);
                                res.json({
                                    error: "Erro"
                                });
                            }
                        });
                    }
                    db.query(queryUpdateUserPlate, [userNumber, carInfo.plate], function (err, resUpdateUser) {
                        if (err) {
                            rollback(db);
                            console.log(err);
                            res.json({
                                error: "Ocorreu um erro."
                            });
                        } else {
                            res.json({
                                msg: "Dados de utilizador atualizados",
                                number: userNumber,
                                plate: carInfo.plate,
                                car_brand: carInfo.car_brand,
                                car_model: carInfo.car_model
                            });
                        }
                    });
                }
            });
        }
    });
};

userController.showUsersInfo = function (req, res, next) {
    var query = `
        SELECT *
        FROM parkdriver pd, users u, cars c
        WHERE pd.number = u.number AND pd.plate = c.plate`;

    db.query(query, function (err, result) {
        if (err) {
            res.json({
                error: "Ocorreu um erro"
            });
        } else {
            res.json({ users: result.rows });
        }
    });
};

userController.showUserEntries = function (req, res, next) {
    var userNumber = req.params.number;

    var query = `
        SELECT *
        FROM users u, parkdriver pd, parkaccess pa, cars c
        WHERE u.number = $1 AND pd.number = u.number AND pa.plate = pd.plate AND c.plate = pd.plate`;

    db.query(query, [userNumber], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result.rows);
        }
    });
};

module.exports = userController;