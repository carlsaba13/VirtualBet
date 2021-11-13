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

router.post('/login', function(req,res,next) {
  console.log('Recieved information');
  console.log('In post');
});

module.exports = router;
