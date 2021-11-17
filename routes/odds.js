var express = require('express');
var router = express.Router();
const Odd = require('../models/Odds.js');

/* GET a games odds. */
router.get('/:game_id', function(req, res) {
    Odd.findOne({gameID: req.params['game_id']}, function (err, odd){
        res.send(odd);
    });
});

//YOU SHOULD ONLY BE ABLE TO DO THIS IF YOU ARE A BOOKIE
/* POST URL Path /film/. */
router.post('/', function(req, res, next) {
    // Add object to database
    Bet.create(req.body, function(err, newBet){
    if(err){
        console.log(err)
        res.status(400).send();
    }
    else{
        res.status(201).send();
    }
    });
});


module.exports = router;