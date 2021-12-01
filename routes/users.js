var express = require('express');
var router = express.Router();
const User = require('../models/Users.js');

//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hashCode (str){
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function (err, users){
    res.send(users);
  });
  //res.send('respond with a resource');
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
    email: req.body.email,
    bookie: req.body.bookie,
    password: hashCode(req.body.password),
    balance: 100
  }
  req.body.password = req.body.Password;
  // Add object to database
  User.create(user, function(err, newBet){
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
