var express = require('express');
var router = express.Router();
var sdv = require('sportsdataverse');

/* GET home page. */
router.get('/', function(req, res, next) {
    var input = {
        year: 2020,
        month: 11,
        day: 11
    };
    weekSchedule(input, res)
});

/* takes date as input and returns games that week*/
async function weekSchedule(input, res){
    var result = await sdv.nfl.getSchedule(input);
    res.send(result);
}

module.exports = router;