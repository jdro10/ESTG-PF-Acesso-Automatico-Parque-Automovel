var express = require('express');
var router = express.Router();
var user = require('../controllers/usersController');

function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Não autorizado" });
  }
}

router.get('/', authenticated, function (req, res, next) {
  user.showAllUsersInfo(req, res);
});

router.get('/showParkAccessByDate/:date', authenticated, function (req, res, next) {
  user.showParkAccessByDate(req, res);
});

router.get('/showOpenParkAccessByDate/:date', authenticated, function (req, res, next) {
  user.showOpenParkAccessByDate(req, res);
});

router.post('/createUser', authenticated, function (req, res, next) {
  user.create(req, res);
});

router.put('/updateUser', authenticated, function (req, res, next) {
  user.updateUserCar(req, res);
});

router.get('/parkAccess', authenticated, function (req, res, next) {
  user.showParkAccess(req, res);
});

router.get('/userInfo/:number', authenticated,function (req, res, next) {
  user.showUserInfo(req, res);
});

router.get('/userEntries/:number', authenticated, function (req, res, next) {
  user.showUserParkEntries(req, res);
});

router.put('/disableAccess/:plate', authenticated, function (req, res, next) {
  user.disableUserParkAccess(req, res);
});

router.put('/enableAccess/:plate', authenticated, function (req, res, next) {
  user.enableUserParkAccess(req, res);
});

router.get('/searchByPlate/:plate', authenticated, function (req, res, next) {
  user.searchByPlate(req, res);
});

module.exports = router;