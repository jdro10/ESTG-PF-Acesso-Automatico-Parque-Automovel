var express = require('express');
var router = express.Router();
var user = require('../controllers/usersController');

router.get('/', function(req, res, next) {
  user.showUsersInfo(req, res);
});

router.post('/createUser', function(req, res, next){
  user.create(req, res);
});

router.put('/updateUser', function(req, res, next){
  user.updateUserCar(req, res);
});

router.get('/:number', function(req, res, next) {
  user.showUserEntries(req, res);
});

module.exports = router;