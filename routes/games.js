var express = require('express');
var router = express.Router();
var sdv = require('sportsdataverse');

/* GET home page. */
router.get('/', function(req, res, next) {
    var input = {
        year: 2021,
        month: 11,
        day: 11
    };
    upcomingGames(input, res)
});

/* takes date as input and returns games that week*/
async function weekSchedule(input, res){
    var result = await sdv.nfl.getSchedule(input);
    res.send(result);
}
async function upcomingGames(input, res){
    var result = await sdv.nfl.getSchedule(input);
    var days = Object.keys(result);
    var ans = [];
    for(i in days){
        ans[i] = {"date":days[i], "games":[]};
        for(j in result[days[i]]['games']){
            //console.log(result[days[i]]['games'][j]["shortName"]);
            ans[i]['games'].push({"name": result[days[i]]['games'][j]["shortName"], "competitors": []});
            for(k in result[days[i]]['games'][j]['competitions']['0']['competitors']){
                //console.log(result[days[i]]['games'][j]['competitions']['0']['competitors'][k]);
                ans[i]['games'][j]['competitors'].push({"name": result[days[i]]['games'][j]['competitions']['0']['competitors'][k]['team']['displayName'],"score": result[days[i]]['games'][j]['competitions']['0']['competitors'][k]['score'], "win": result[days[i]]['games'][j]['competitions']['0']['competitors'][k]['winner']});

            }
        }

    }
    res.send(ans);
}

module.exports = router;