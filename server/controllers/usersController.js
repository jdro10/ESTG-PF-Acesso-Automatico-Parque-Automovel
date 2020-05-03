const db = require('../config/db');

var userController = {};

userController.create = function(req, res, next){
    var user = {
        number: req.body.number,
        name: req.body.name,
        plate: req.body.plate,
        car_brand: req.body.car_brand,
        car_model: req.body.car_model
    };

    db.query(
        "INSERT INTO users(number, name, plate, car_brand, car_model) VALUES ($1, $2, $3, $4, $5)",
        [user.number, user.name, user.plate, user.car_brand, user.car_model],
        function (err, res){
            if(err){
                next(err);
            } else{
                console.log(res);
            }
        });

    res.json(user);
};

module.exports = userController;