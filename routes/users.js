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

// PUT request that creats or edits specific user or returns 404 if user schema is wrong
router.put('/:email', function(req, res, next) {
  if(checkSchema(req.body) == true){
    User.findOneAndUpdate({email: req.params['email']}, req.body, function (err, user) {
      if (!err) {
        // If the document doesn't exist
        if (!user) {
          // Create it
          // Save the document
          User.create(req.body, function(err, newUser){
            if(err){
              console.log(err)
              res.status(400).send();
            }
            else{
              document.cookie = "Login =" + true + ":" + "Username =" + newUser.Email
              res.status(201).send();
            }
          });
        }
      }
    });
    res.status(201).send();
  
});



module.exports = router;
