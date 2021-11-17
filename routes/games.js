var express = require('express');
var router = express.Router();
var sdv = require('sportsdataverse');
const axios = require('axios');

/* GET home page. */
router.get('/', async function(req, res) {
    var input = 10;
    try{
        let result = await upcomingGames(input,res);
        res.send(result);
    }
    catch{
        // This is for an error that occurs when the promise is fufilled that does not effect functionallity
    }
});

/* takes date as input and returns games that week*/
async function OLDupcomingGames(input, res){
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
    //res.send(ans);
    return ans;
}

/* Returns games in a week parsed for relavent data*/
async function upcomingGames(week,res){
    var result = await getSchez(week);
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
/* Gets the schedule for a given week*/
async function getSchez(week){
    const baseUrl = `https://cdn.espn.com/nfl/schedule/_/week/`+ week;
    const params = {
        xhr: 1,
        render: false,
        device: 'desktop',
        userab: 18
    };
    const res = await axios.get(baseUrl, {
        params
    });
    return res.data.content.schedule;
}

module.exports = router;