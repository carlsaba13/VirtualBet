var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:email', function(req, res) {
  Odd.findOne({email: req.params['email']}, function (err, user){
      res.send(user);
  });
});

// PUT request that creats or edits specific user or returns 404 if user schema is wrong
router.put('/:email', function(req, res, next) {
  if(checkSchema(req.body) == true){
    Film.findOneAndUpdate({email: req.params['email']}, req.body, function (err, user) {
      if (!err) {
        // If the document doesn't exist
        if (!user) {
          // Create it
          // Save the document
          Film.create(req.body, function(err, newUser){
            if(err){
              console.log(err)
              res.status(400).send();
            }
            else{
              res.status(201).send();
            }
          });
        }
      }
    });
    res.status(201).send();
  }
  else{
    res.status(404).send();
  }
});

module.exports = router;
