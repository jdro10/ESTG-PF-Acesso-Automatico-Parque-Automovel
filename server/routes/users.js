var express = require('express');
var router = express.Router();
var user = require('../controllers/usersController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createUser', function(req, res, next){
  user.create(req, res);
});

router.put('/updateUser', function(req, res, next){
  user.updateUserCar(req, res);
});

module.exports = router;