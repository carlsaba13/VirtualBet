var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.get('/bets', function(req, res, next) {
  res.render('bets', { title: 'Express' });
});

router.get('/setOdds', function(req, res, next) {
  res.render('setOdds', { title: 'Express' });
});

router.get('/statistics', function(req, res, next) {
  res.render('statistics', { title: 'Express' });
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});

module.exports = router;
