var express = require('express');
var router = express.Router();
var dbC = require('../controllers/dbController');

function authenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: "Não autorizado" });
    }
}

router.post('/', authenticated, function (req, res, next) {
    dbC.createUserTable(req, res);
    dbC.createCarTable(req, res);
    dbC.createParkDriverTable(req, res);
    dbC.createParkAccessTable(req, res);
    dbC.createWebsiteUserTable(req, res);

    res.json({ msg: "tables created successfully" })
});

module.exports = router;