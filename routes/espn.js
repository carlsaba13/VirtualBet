const axios = require('axios');

/* takes date as input and returns games that week*/
async function OLDupcomingGames(input, res){
    var result = await sdv.nfl.getSchedule(input);
    var days = Object.keys(result);
    var ans = [];
    for(i in days){
        //ans[i] = {"date":days[i], "games":[]};
        for(j in result[days[i]]['games']){
            //console.log(result[days[i]]['games'][j]["shortName"]);
            ans[j]=({"name": result[days[i]]['games'][j]["shortName"], "competitors": []});
            for(k in result[days[i]]['games'][j]['competitions']['0']['competitors']){
                //console.log(result[days[i]]['games'][j]['competitions']['0']['competitors'][k]);
                ans[j]['competitors'].push({"name": result[days[i]]['games'][j]['competitions']['0']['competitors'][k]['team']['displayName'],"score": result[days[i]]['games'][j]['competitions']['0']['competitors'][k]['score'], "win": result[days[i]]['games'][j]['competitions']['0']['competitors'][k]['winner']});
            }
        }

    }
    return ans;
}

/* Returns games in a week parsed for relavent data*/
async function upcomingGames(week,res){
    var result = await getSchez(week);
    var days = Object.keys(result);
    var ans = [];
    for(i in days){
        //ans[i] = {"date":days[i], "games":[]};
        for(j in result[days[i]]['games']){
            //console.log(result[days[i]]['games'][j]["shortName"]);
            ans[j] = ({"id":result[days[i]]['games'][j]["id"], "name": result[days[i]]['games'][j]["shortName"], "competitors": []});
            for(k in result[days[i]]['games'][j]['competitions']['0']['competitors']){
                //console.log(result[days[i]]['games'][j]['competitions']['0']['competitors'][k]);
                ans[j]['competitors'].push({"name": result[days[i]]['games'][j]['competitions']['0']['competitors'][k]['team']['displayName'],"score": result[days[i]]['games'][j]['competitions']['0']['competitors'][k]['score'], "win": result[days[i]]['games'][j]['competitions']['0']['competitors'][k]['winner']});
            }
        }

    }
    return ans;
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

module.exports = upcomingGames;