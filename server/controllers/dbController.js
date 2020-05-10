const db = require('../config/db');

var dbController = {};

dbController.createUserTable = function (req, res) {
    const query = `
        CREATE TABLE users (
            number INTEGER,
            firstName VARCHAR,
            lastName VARCHAR,
            PRIMARY KEY(number)
        );`;

    db.query(query, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("Users table created successfully");
        }
    });
};

dbController.createCarTable = function (req, res) {
    const query = `
        CREATE TABLE cars (
            plate VARCHAR,
            car_brand VARCHAR,
            car_model VARCHAR,
            PRIMARY KEY(plate)
        );`;

    db.query(query, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("Car table created successfully");
        }
    });
};

dbController.createParkAccessTable = function (req, res) {
    const query = `
        CREATE TABLE parkAccess (
            plate VARCHAR,
            date_in DATE,
            time_in TIME,
            date_out DATE,
            time_out TIME,
            PRIMARY KEY(time_in),
            FOREIGN KEY(plate) REFERENCES parkDriver(plate)
        );`;

    db.query(query, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("Parking lot access table created successfully");
        }
    });
};

dbController.createParkDriverTable = function (req, res) {
    const query = `
        CREATE TABLE parkDriver (
            number INTEGER,
            plate VARCHAR UNIQUE,
            PRIMARY KEY(number, plate),
            FOREIGN KEY(number) REFERENCES users(number),
            FOREIGN KEY(plate) REFERENCES cars(plate)
        );`;

    db.query(query, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("Park driver table created successfully");
        }
    });
};

dbController.createOpenParkAccessTable = function(req, res) {
    const query = `
        CREATE TABLE openParkAccess (
            plate VARCHAR,
            date_in DATE,
            time_in TIME,
            date_out DATE,
            time_out TIME,
            PRIMARY KEY(time_in)
        );`;

        db.query(query, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Parking lot open access table created successfully");
            }
        });
};

dbController.createUserTable();
dbController.createCarTable();
dbController.createParkDriverTable();
dbController.createParkAccessTable();
dbController.createOpenParkAccessTable();