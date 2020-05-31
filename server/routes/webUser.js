var express = require('express');
var router = express.Router();
var webUser = require('../controllers/webUserController');

router.post('/create', function(req, res, next) {
    webUser.create(req, res);
});

module.exports = router;