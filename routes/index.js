var express = require('express');
var router = express.Router();

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

module.exports = router;
