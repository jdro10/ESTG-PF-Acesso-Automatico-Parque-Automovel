var express = require('express');
var router = express.Router();
var park = require('../controllers/parkController');

function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Não autorizado"} );
  }
}

router.get('/getParkMode', authenticated, function (req, res, next) {
  park.getParkMode(req, res);
});

router.put('/setParkMode', authenticated, function (req, res, next) {
  park.setParkMode(req, res);
});

module.exports = router;