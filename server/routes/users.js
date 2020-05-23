var express = require('express');
var router = express.Router();
var user = require('../controllers/usersController');

router.get('/', function(req, res, next) {
  user.showAllUsersInfo(req, res);
});

router.get('/showParkAccessByDate/:date', function(req, res, next) {
  user.showParkAccessByDate(req, res);
});

router.get('/showOpenParkAccessByDate/:date', function(req, res, next) {
  user.showOpenParkAccessByDate(req, res);
});

router.post('/createUser', function(req, res, next){
  user.create(req, res);
});

router.put('/updateUser', function(req, res, next){
  user.updateUserCar(req, res);
});

router.get('/parkAccess', function (req, res, next) {
  user.showParkAccess(req, res);
});

router.get('/userInfo/:number', function(req, res, next) {
  user.showUserInfo(req, res);
});

router.get('/userEntries/:number', function(req, res, next) {
  user.showUserParkEntries(req, res);
});

router.put('/disableAccess/:number', function(req, res, next) {
  user.disableUserParkAccess(req, res);
});

router.put('/enableAccess/:number', function(req, res, next){
  user.enableUserParkAccess(req, res);
});

module.exports = router;