var express = require('express');
var router = express.Router();
const upcomingGames = require('./espn.js');
const Bet = require('../models/Bets.js');



/* GET home page. */
router.get('/', async function(req, res) {
    var input = 10;
        let result = await upcomingGames(input,res);
        res.send(result);
});
/* GET a users bets. */
router.get('/:user_id', function(req, res) {
    Bet.find({userID: req.params['user_id']}, async function (err, bets){
        // Check for win or loss
        for(var i in bets){
            let result = await upcomingGames(bets[i]["week"],res);
            for(var j in result){
                if(bets[i]["gameID"] == result[j]["id"]){
                    if(bets[i]["competitor1"] == true && result[j]["competitors"][0]["win"] == true){
                        bets[i]["victory"] = true;
                    }
                    else if(bets[i]["competitor1"] == false && result[j]["competitors"][0]["win"] == false){
                        bets[i]["victory"] = true;
                    }
                    else if(bets[i]["competitor1"] == true && result[j]["competitors"][0]["win"] == false){
                        bets[i]["victory"] = false;
                    }
                    else if(bets[i]["competitor1"] == false && result[j]["competitors"][0]["win"] == true){
                        bets[i]["victory"] = false;
                    }
                }
            }
        }
        res.send(bets);
    });
});

/* POST URL Path /bets/. */
router.post('/', function(req, res, next) {
    var sampleBet = {
        userID: 1,
        gameID: 401326471,
        week:10,
        competitor1: false,
        competitor2: true
    };
    // Add object to database
    Bet.create(sampleBet, function(err, newBet){
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