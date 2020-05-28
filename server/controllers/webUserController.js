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

webUserController.login = function(req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password
    };

    var queryUserHash = `
        SELECT passwordhash
        FROM usersweb
        WHERE username = $1`;
    
    db.query(queryUserHash, [user.username], function(err, resPasswordHash) {
        if(err){
            console.log(err);
            res.json({
                error: "Ocorreu um erro."
            });
        } else if(resPasswordHash.rowCount > 0) {
            bcrypt.compare(user.password, resPasswordHash.rows[0].passwordhash, function(err, resHash) {
                if(resHash){
                    res.json({
                        login: true
                    });
                } else {
                    res.json({
                        login: false
                    });
                }
              });
        }
    });    
};

module.exports = webUserController;