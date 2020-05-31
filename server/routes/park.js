var express = require('express');
var router = express.Router();
var park = require('../controllers/parkController');

var authenticated = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else{
      console.log("not auth");
    }
}

router.get('/getParkMode', authenticated, function(req, res, next){
    park.getParkMode(req, res);
});

router.put('/setParkMode', function(req, res, next) {
    park.setParkMode(req, res);
});

module.exports = router;