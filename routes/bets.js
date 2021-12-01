var express = require('express');
var router = express.Router();
const upcomingGames = require('./espn.js');
const Bet = require('../models/Bets.js');
const User = require('../models/Users.js');



/* GET a users bets. This is also where it checks if your bet was right or wrong */
router.get('/:user_id', function(req, res) {
    Bet.find({email: req.params['user_id']}, async function (err, bets){
        // Check for win or loss
        for(var i in bets){
            let result = await upcomingGames(bets[i]["week"],res);
            for(var j in result){
                if(bets[i]["gameID"] == result[j]["id"]){
                    if(bets[i]["home"] == true && result[j]["competitors"][0]["win"] == true && bets[i]["victory"] == null){ // && bets[i]["victory"] == null
                        bets[i]["victory"] = true;
                        bets[i].save();
                        // Edit balance
                        User.findOne({email: req.params['user_id']}, async function (err, user){
                            if(err){
                                return;
                            }
                            var o = bets[i]["odds"];
                            var a = bets[i]["amount"];
                            if(o < 0){
                                o *= -1;
                                user["balance"] += ((o+100)/o)*a;
                            }
                            else{
                                user["balance"] += ((o+100)/100)*a;
                            }
                            user.save();
                        });
                    }
                    else if(bets[i]["home"] == false && result[j]["competitors"][0]["win"] == false && bets[i]["victory"] == null){ // && bets[i]["victory"] == null
                        bets[i]["victory"] = true;
                        bets[i].save();
                        // Edit balance
                        User.findOne({email: req.params['user_id']}, async function (err, user){
                            if(err){
                                return;
                            }
                            var o = bets[i]["odds"];
                            var a = bets[i]["amount"];
                            if(o < 0){
                                o *= -1;
                                user["balance"] += ((o+100)/o)*a;
                            }
                            else{
                                user["balance"] += ((o+100)/100)*a;
                            }
                            user.save();
                        });
                    }
                    else if(bets[i]["home"] == true && result[j]["competitors"][0]["win"] == false){ // && bets[i]["victory"] == null
                        bets[i]["victory"] = false;
                        bets[i].save();
                    }
                    else if(bets[i]["home"] == false && result[j]["competitors"][0]["win"] == true){ // && bets[i]["victory"] == null
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
    console.log('Here');
    // THIS IS WHAT THE REQUEST BODY NEEDS TO LOOK LIKE
    var sampleBet = {
        email: "user@example.com",
        gameID: 34,
        week: 12,
        home: true,
        odds: -150,
        amount: 300,
        victory: null
    };
    // Add object to database
    console.log(req.body);
    Bet.create(req.body, function(err, newBet){
    if(err){
        console.log(err)
        res.status(400).send();
    }
    else{
        User.findOne({email: req.body['email']}, async function (err, user){
            user["balance"] -= req.body['amount'];
            user.save();
        });
        res.status(201).send();
    }
    });
});


module.exports = router;