const db = require('../config/db');

var dbController = {};

dbController.createUserTable = function(req, res){
    db.query(
        "CREATE TABLE users(number INTEGER, name VARCHAR(40), plate VARCHAR(6) PRIMARY KEY, car_brand VARCHAR(20), car_model VARCHAR(20))", function(err, res){
            if(err){
                console.log(err);
            } else{
                console.log("Users table created successfully");
            }
        });
};

dbController.createParkingLotAccessTable = function(req, res){
    db.query(
        "CREATE TABLE parkAccess(plate VARCHAR(6), date DATE, FOREIGN KEY(plate) REFERENCES users(plate))", function(err, res){
            if(err){
                console.log(err);
            }else{
                console.log("Parking lot access table created successfully");
            }
        });
};