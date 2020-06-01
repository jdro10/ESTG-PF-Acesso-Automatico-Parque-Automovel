var express = require('express');
var router = express.Router();
var passport = require('passport');

function authenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: "Não autorizado" });
    }
}

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

router.get('/logout', authenticated, function (req, res, next) {
    req.logout();
    
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;