const db = require('../config/db');

var userController = {};

var rollback = function (db) {
    db.query('ROLLBACK');
};

userController.create = function (req, res, next) {
    var user = {
        number: req.body.number,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        plate: req.body.plate,
        car_brand: req.body.car_brand,
        car_model: req.body.car_model,
        type: req.body.type
    };

    var queryUser = `
        INSERT INTO users (number, firstName, lastName)
        VALUES ($1, $2, $3)`;

    var queryVehicle = `
        INSERT INTO vehicles (plate, car_brand, car_model, type, access_park)
        VALUES ($1, $2, $3, $4, TRUE)`;

    var queryParkDriver = `
        INSERT INTO parkDriver (number, plate) 
        VALUES ($1, $2)`;

    db.query(queryUser, [user.number, user.firstName, user.lastName], function (err, resUserQuery) {
        if (err) {
            rollback(db);

            res.json({
                error: "Número de utilizador já existente."
            });
        } else {
            db.query(queryVehicle, [user.plate, user.car_brand, user.car_model, user.type], function (err, resVehicleQuery) {
                if (err) {
                    rollback(db);

                    res.json({
                        error: "Matrícula já existente."
                    });
                } else {
                    db.query(queryParkDriver, [user.number, user.plate], function (err, resDriverQuery) {
                        if (err) {
                            rollback(db);

                            res.json({
                                error: "Ocorreu um erro."
                            });
                        } else {
                            res.json({
                                user: user
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

    var car = {
        plate: req.body.plate,
        car_brand: req.body.car_brand,
        car_model: req.body.car_model,
        type: req.body.type
    };

    var queryUserPlate = `
        SELECT plate
        FROM parkdriver
        WHERE number = $1`;

    var queryVehicle = `
        INSERT INTO vehicles (plate, car_brand, car_model, type, access_park)
        VALUES ($1, $2, $3, $4, TRUE)`;

    var queryUpdateUserPlate = `
        INSERT INTO parkdriver (number, plate)
        VALUES ($1, $2)`;

    var queryPlateParkAcess = `
        UPDATE vehicles
        SET access_park = FALSE
        WHERE plate = $1 AND access_park = TRUE`;

    db.query(queryVehicle, [car.plate, car.car_brand, car.car_model, car.type], function (err, resVehicleQuery) {
        if (err) {
            rollback(db);

            res.json({
                error: "Matrícula já existente."
            });
        } else {
            db.query(queryUserPlate, [userNumber], function (err, resUserQuery) {
                if (err) {
                    rollback(db);
                    
                    res.json({
                        error: "Número já existente."
                    });
                } else {
                    db.query(queryPlateParkAcess, [resUserQuery.rows[0]['plate']], function (err, resPlateQuery) {
                        if (err) {
                            rollback(db);
                            
                            res.json({
                                error: "Erro"
                            });
                        } else {
                            db.query(queryUpdateUserPlate, [userNumber, car.plate], function (err, resUpdateUser) {
                                if (err) {
                                    rollback(db);

                                    res.json({
                                        error: "Ocorreu um erro."
                                    });
                                } else {
                                    res.json({
                                        number: userNumber,
                                        plate: car.plate,
                                        car_brand: car.car_brand,
                                        car_model: car.car_model,
                                        type: car.type
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

userController.showAllUsersInfo = function (req, res, next) {
    var query = `
        SELECT *
        FROM parkdriver pd, users u, vehicles v
        WHERE pd.number = u.number AND pd.plate = v.plate`;

    db.query(query, function (err, resUsersInfo) {
        if (err) {
            res.json({
                error: "Ocorreu um erro"
            });
        } else {
            res.json({
                users: resUsersInfo.rows
            });
        }
    });
};

userController.showUserInfo = function (req, res, next) {
    var userNumber = req.params.number;

    var query = `
        SELECT *
        FROM users u, parkdriver pd, vehicles v
        WHERE u.number = $1 AND pd.number = u.number AND v.plate = pd.plate`;

    db.query(query, [userNumber], function (err, resUserQuery) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                user: resUserQuery.rows
            });
        }
    });
};

userController.showUserParkEntries = function (req, res, next) {
    var userNumber = req.params.number;

    var query = `
        SELECT *
        FROM users u, parkdriver pd, parkaccess pa, vehicles v
        WHERE u.number = $1 AND pd.number = u.number AND pa.plate = pd.plate AND v.plate = pd.plate`;

    db.query(query, [userNumber], function (err, resUserEntries) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                userEntries: resUserEntries.rows
            });
        }
    });
};

userController.disableUserParkAccess = function (req, res, next) {
    var userNumber = req.params.number;

    var queryUser = `
        SELECT pd.plate
        FROM parkdriver pd, vehicles v
        WHERE pd.number = $1 AND pd.plate = v.plate AND c.access_park = TRUE`;

    var queryVehicle = `
        UPDATE vehicles
        SET access_park = FALSE
        WHERE plate = $1`;

    db.query(queryUser, [userNumber], function (err, resUserQuery) {
        if (err) {
            console.log(err);
        } else if (resUserQuery.rowCount > 0) {
            db.query(queryVehicle, [resUser.rows[0]['plate']], function (err, resVehicleQuery) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        userNumber: userNumber,
                        parkAccess: false
                    });
                }
            });
        } else {
            res.json({
                error: "Número inválido"
            });
        }
    });
};

userController.enableUserParkAccess = function (req, res, next) {
    var userPlate = req.params.plate;

    var queryVehicle = `
        UPDATE vehicles
        SET access_park = TRUE
        WHERE plate = $1`;

    db.query(queryVehicle, [userPlate], function (err, resVehicleQuery) {
        if (err) {
            console.log(err);
        } else if (resVehicleQuery.rowCount > 0) {
            res.json({
                plate: userPlate,
                parkAccess: true
            });
        } else {
            res.json({
                msg: "Matrícula inválida"
            });
        }
    });
};

module.exports = userController;