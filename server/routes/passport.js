var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            res.json(err);
        }
        if (!user) {
            res.json(info);
        } else {
            req.logIn(user, function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({ message: "Login correto." })
                }
            });
        }
    })(req, res, next);
});

module.exports = router;