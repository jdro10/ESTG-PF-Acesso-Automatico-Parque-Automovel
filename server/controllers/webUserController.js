var db = require('../config/db');
var bcrypt = require('bcrypt');

var webUserController = {};

webUserController.create = function (req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password
    };

    var queryUserWeb = `
        INSERT INTO usersweb (username, passwordhash)
        VALUES ($1, $2)`;

    bcrypt.hash(user.password, 10, (err, passwordhash) => {
        db.query(queryUserWeb, [user.username, passwordhash], function (err, resQuery) {
            if (err) {
                res.json({
                    error: "Número de utilizador já existente."
                });
            } else {
                res.json({
                    success: "Utilizador registado."
                });
            }
        })
    });
};

module.exports = webUserController;