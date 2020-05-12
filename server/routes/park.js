var express = require('express');
var router = express.Router();
var park = require('../controllers/parkController');

router.get('/getParkMode', function(req, res, next){
    park.getParkMode(req, res);
});

router.put('/changeParkMode', function(req, res, next) {
    park.changeParkMode(req, res);
});

module.exports = router;