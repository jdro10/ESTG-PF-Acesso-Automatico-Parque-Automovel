const db = require('../config/db');

const usersTable = db.query(
    "CREATE TABLE users(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL)", (err, res) => {
        console.log(err, res);
        db.end();
    });