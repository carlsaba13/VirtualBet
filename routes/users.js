var express = require('express');
var router = express.Router();
const User = require('../models/Users.js');

//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:email', function(req, res) {
  User.findOne({email: req.params['email']}, function (err, user){
      res.send(user);
  });
});

/* POST URL Path /bets/. */
router.post('/', function(req, res, next) {
  // THIS IS WHAT THE REQUEST BODY NEEDS TO LOOK LIKE
  var user = {
    email: "email",
    bookie: false,
    password: "pass",
    balance: 100
  }
  req.body.password = hashcode(req.body.Password)
  // Add object to database
  User.create(req.body, function(err, newBet){
  if(err){
      console.log(err)
      res.status(400).send();
  }
  else{
      res.status(201).send();
  }
  });
});

router.post('/:email', function(req, res, next) {
  // Add object to database
  User.findOne({email: req.params['email']}, function(err, user){
  if(err){
      console.log(err)
      res.status(400).send();
  }
  else{
      user['balance'] += req.body['deposit'];
      user.save();
      res.status(201).send();
  }
  });
});



module.exports = router;
