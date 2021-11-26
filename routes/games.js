var express = require('express');
var router = express.Router();
var sdv = require('sportsdataverse');
const axios = require('axios');
const upcomingGames = require('./espn.js');

/* GET home page. */
router.get('/:week', async function(req, res) {
    var input = req.params.week;
        let result = await upcomingGames(input,res);
        res.send(result);
});


module.exports = router;