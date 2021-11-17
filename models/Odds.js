const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oddSchema = new mongoose.Schema({

    gameID: Number,
    competitor1: Number,
    competitor2: Number
 });


const Odd = mongoose.model('Odd', oddSchema);

module.exports = Odd;