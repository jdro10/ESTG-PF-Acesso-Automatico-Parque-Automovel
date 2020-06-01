var express = require('express');
var router = express.Router();
var webUser = require('../controllers/webUserController');

function authenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: "Não autorizado" });
    }
}

router.post('/create', authenticated, function (req, res, next) {
    webUser.create(req, res);
});

module.exports = router;