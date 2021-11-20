const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oddSchema = new mongoose.Schema({

    gameID: Number,
    home: Number,
    away: Number
});

/*
{
    gameID: 34
    home: -140
    away: +120
}
*/

const Odd = mongoose.model('Odd', oddSchema);

module.exports = Odd;