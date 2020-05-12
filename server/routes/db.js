var express = require('express');
var router = express.Router();
var dbC = require('../controllers/dbController');

router.post('/', function (req, res, next) {
    dbC.createUserTable(req, res);
    dbC.createCarTable(req, res);
    dbC.createParkDriverTable(req, res);
    dbC.createParkAccessTable(req, res);
    
    res.json({msg: "tables created succssfully"})
});

module.exports = router;