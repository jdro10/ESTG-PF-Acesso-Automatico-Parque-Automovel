var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');

require('./config/passport')(passport);

var usersRouter = require('./routes/users');
var platesRouter = require('./routes/plates');
var parkRouter = require('./routes/park');
var dbRouter = require('./routes/db');
var webUserRouter = require('./routes/webUser');
var authenticationRouter = require('./routes/passport');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:4200'],
  credentials: true
}));
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);
app.use('/plates', platesRouter);
app.use('/park', parkRouter);
app.use('/db', dbRouter);
app.use('/webUser', webUserRouter);
app.use('/auth', authenticationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("Server running on port 3000");

module.exports = app;