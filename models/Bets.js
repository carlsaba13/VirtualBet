const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betSchema = new mongoose.Schema({

    email: String,
    gameID: Number,
    week: Number,
    home: Boolean,
    odds: Number,
    amount: Number,
    victory: Boolean

    /*
    {
        email: 2
        game_id: 34
        week: 12
        home: True
        odds: -150
        amount: 300
        victory: null
    }
    */
 });


const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;