const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betSchema = new mongoose.Schema({

    userID: Number,
    gameID: Number,
    week: Number,
    competitor1: Boolean,
    competitor2: Boolean,
    victory: Boolean
 });


const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;