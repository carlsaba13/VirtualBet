function validateWeek(){
    new Promise(function(resolve, reject) {
        resolve(getGames(document.getElementById('select-week').value));
    })
    .then(s => document.getElementById('week-form').remove());
    
}

function getGames(week) {
    fetch('/games/'.concat(week))
    .then(res => res.json())
    .then(data => {
        for (i in data) {
            let game = data[i];
            let dateTime = game["date"].split("T");
            let date = dateTime[0];
            let time = dateTime[1].slice(0, -1) + "";
            let gameID = game["id"];
            console.log(gameID);
            let competitors = game["competitors"];
            let team1 = competitors["0"]["name"];
            let team2 = competitors["1"]["name"];
            fetch('/odds/'.concat(gameID))
            .then(res => {
                if (!res) {
                    console.log("failed");
                    throw 'ErrorCaused';
                } else {
                    return res.json()
                }
            })
            .then(data => {
                for (i in data) {
                    let homeOdds = data["home"];
                    let awayOdds = data["away"];
                    makeNewBet(date, team1, team2, time, homeOdds, awayOdds);
                }
            }).catch(error => console.log(error));    
            
        }
        //console.log(JSON.stringify(data))
    });
}


function makeMoneyLine(team1, team2, line1, line2) {
    let table = document.createElement("table");
    let teams = table.insertRow("0");
    teams.outerHTML = "<th>" + team1 + "</th><th>" + team2 + "</th>";
    let moneyLine = table.insertRow("1");
    let moneyLine1 = moneyLine.insertCell("0");
    let moneyLine2 = moneyLine.insertCell("1");
    moneyLine1.outerHTML = '<td><button type="button">' + line1 + '</button></td>';
    moneyLine2.outerHTML = '<td><button type="button">' + line2 + '</button></td>';
    return table;
}

function betForm() {
    let form = document.createElement("form");
    form.action = "/bets/";
    form.method = "post";
    let l = document.createElement("label");
    let i = document.createElement("input");
    let s = document.createElement("input");
    l.innerHTML = '<label for="amount">Bet Amount:</label>';
    i.type = "text";
    i.class = "amount";
    s.type = "submit";
    s.value = "Place Bet";
    form.appendChild(l);
    form.appendChild(i);
    form.appendChild(s);
    return form;
}

function makeNewBet(gameDate, team1, team2, gameTime, homeLine, awayLine) {
    let infoRow = document.getElementById("betOffer").insertRow("1");
    let date = infoRow.insertCell("0");
    date.innerHTML = gameDate;
    date.className = "betInfo"
    let teams = infoRow.insertCell("1");
    teams.innerHTML = team1 + " @ " + team2;
    teams.className = "betInfo"
    let time = infoRow.insertCell("2");
    time.innerHTML = gameTime;
    time.className = "betInfo"
    let moneyLineHTML = makeMoneyLine(team1, team2, homeLine, awayLine);
    let moneyLine = infoRow.insertCell("3");
    moneyLine.appendChild(moneyLineHTML);
    moneyLine.className = "betInfo"
    let amount = infoRow.insertCell("4");
    let formHTML = betForm();
    amount.appendChild(formHTML);
}