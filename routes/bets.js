var express = require('express');
var router = express.Router();
const upcomingGames = require('./espn.js');
const Bet = require('../models/Bets.js');



/* GET a users bets. This is also where it checks if your bet was right or wrong */
router.get('/:user_id', function(req, res) {
    Bet.find({userID: req.params['user_id']}, async function (err, bets){
        // Check for win or loss
        for(var i in bets){
            let result = await upcomingGames(bets[i]["week"],res);
            for(var j in result){
                if(bets[i]["gameID"] == result[j]["id"]){
                    if(bets[i]["competitor1"] == true && result[j]["competitors"][0]["win"] == true){
                        bets[i]["victory"] = true;
                        bets[i].save();
                        // Edit balance
                    }
                    else if(bets[i]["competitor1"] == false && result[j]["competitors"][0]["win"] == false){
                        bets[i]["victory"] = true;
                        bets[i].save();
                        // Edit balance
                    }
                    else if(bets[i]["competitor1"] == true && result[j]["competitors"][0]["win"] == false){
                        bets[i]["victory"] = false;
                        bets[i].save();
                    }
                    else if(bets[i]["competitor1"] == false && result[j]["competitors"][0]["win"] == true){
                        bets[i]["victory"] = false;
                        bets[i].save();
                    }
                }
            }
        }
        res.send(bets);
    });
});

/* POST URL Path /bets/. */
router.post('/', function(req, res, next) {
    // THIS IS WHAT THE REQUEST BODY NEEDS TO LOOK LIKE
    var sampleBet = {
        email: "user@example.com",
        game_id: 34,
        week: 12,
        home: True,
        odds: -150,
        amount: 300,
        victory: null
    };
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