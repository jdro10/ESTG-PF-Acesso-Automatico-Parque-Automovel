const db = require('../config/db');

var userController = {};

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
            car_model
        ) VALUES (
            $1,
            $2,
            $3
        )`;

    var queryParkDriver = `
        INSERT INTO parkDriver(
            number,
            plate
        ) VALUES (
            $1,
            $2
        )`;

    db.query(queryUser, [userInfo.number, userInfo.firstName, userInfo.lastName],
        function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Novo utilizador registado.");
            }
        });

    db.query(queryCar, [userInfo.plate, userInfo.car_brand, userInfo.car_model],
        function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Novo carro registado.");
            }
        });

    db.query(queryParkDriver, [userInfo.number, userInfo.plate],
        function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Nova identificação de condutor criada.");
            }
        });

    res.json(userInfo);
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
            car_model
        ) VALUES (
            $1,
            $2,
            $3
        )`;

    var queryUpdateUserPlate = `
        UPDATE parkdriver
        SET plate = $1 
        WHERE plate = $2`;

    db.query(queryCar, [carInfo.plate, carInfo.car_brand, carInfo.car_model],
        function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Novo carro registado.");
            }
        });

    db.query(queryUserPlate, [userNumber],
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                db.query(queryUpdateUserPlate, [carInfo.plate, result.rows[0]['plate']],
                    function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Carro de utilizador atualizado.");
                        }
                    });
            }
        });

    res.json('User car updated');
}

userController.showUsersInfo = function (req, res, next) {
    var query = `
        SELECT *
        FROM parkdriver pd, users u, cars c
        WHERE pd.number = u.number AND pd.plate = c.plate`;

    db.query(query, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result.rows[0]);
        }
    });
}

userController.showUserEntries = function(req, res, next) {
    var userNumber = req.params.number;

    var query = `
        SELECT *
        FROM users u, parkdriver pd, parkaccess pa, cars c
        WHERE u.number = $1 AND pd.number = u.number AND pa.plate = pd.plate AND c.plate = pd.plate`;

    db.query(query, [userNumber], function(err, result){
        if(err){
            console.log(err);
        } else{
            res.json(result.rows);
        }
    });
}

module.exports = userController;