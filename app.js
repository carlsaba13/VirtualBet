var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');
var betsRouter = require('./routes/bets');
var oddsRouter = require('./routes/odds');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

dotenv.config({ path: '.env' });

var app = express();

/**
 * Connect to MongoDB.
 */
 mongoose.Promise = global.Promise;

 mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
 mongoose.connection.on('error', (err) => {
   console.error(err);
   console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
   process.exit();
 });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/odds', oddsRouter);
app.use('/bets', betsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(201);
});


module.exports = app;
