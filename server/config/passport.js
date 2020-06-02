var db = require('../config/db');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ username: 'username' }, function (username, password, done) {

            var queryUser = `
                SELECT *
                FROM usersweb
                WHERE username = $1`;

            db.query(queryUser, [username], function (err, resQuery) {
                if (err) {
                    res.json({
                        error: "Ocorreu um erro."
                    });
                }
                if (resQuery.rowCount == 0) {
                    return done(null, false, { error: "Username inexistente."});
                } else if (resQuery.rowCount > 0) {

                    bcrypt.compare(password, resQuery.rows[0].passwordhash, function (err, resHash) {
                        if (err) {
                            res.json({
                                error: "Ocorreu um erro"
                            });
                        }
                        if (resHash) {
                            return done(null, resQuery.rows[0]);
                        } else {
                            return done(null, false, { error: "Password incorreta."});
                        }
                    });
                }
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};