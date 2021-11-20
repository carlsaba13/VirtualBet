var express = require('express');
var router = express.Router();
const passport = require('passport');
const app = express()
require('../app')
require('../Passport');


const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

app.use(cors())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

// router.get('/bets', function(req, res, next) {
//   res.render('bets', { title: 'Express' });
// });

router.get('/setOdds', function(req, res, next) {
  res.render('setOdds', { title: 'Express' });
});

router.get('/statistics', function(req, res, next) {
  res.render('statistics', { title: 'Express' });
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});

module.exports = router;
