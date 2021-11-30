const teams = ["Las Vegas Raiders", "Baltimore Ravens"];
var teamBetOn = null;
var gameBetOn = null;

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
                let homeOdds = data["home"];
                let awayOdds = data["away"];
                makeNewBet(date, team1, team2, time, homeOdds, awayOdds, gameID);
            }).catch(error => console.log(error));    
            
        }
        //console.log(JSON.stringify(data))
    });
}

function makeMoneyLine(team1, team2, line1, line2, gameID) {
    console.log(gameID);
    let table = document.createElement("table");
    let teams = table.insertRow("0");
    teams.outerHTML = "<th>" + team1 + "</th><th>" + team2 + "</th>";
    let moneyLine = table.insertRow("1");
    let moneyLine1 = moneyLine.insertCell("0");
    let moneyLine2 = moneyLine.insertCell("1");
    
    console.log(line1);
    button1 = makeButton(line1, team1, gameID);
    button2 = makeButton(line2, team2, gameID);
    let td1 = document.createElement("td");
    td1.appendChild(button1);
    let td2 = document.createElement("td");
    td2.appendChild(button2);
    moneyLine1.appendChild(td1);
    moneyLine2.appendChild(td2);
    return table;
}

function makeButton(odd, team, gameID) {
    let buttonObj = document.createElement("button");
    buttonObj.type = "button";
    buttonObj.innerHTML = odd;
    buttonObj.addEventListener("click", function() {
        teamBetOn = team;
        gameBetOn = gameID;
        console.log(team);
        console.log(gameID);
      });
    return buttonObj;
}

function betForm() {
    let form = document.createElement("form");
    form.addEventListener('submit', betPlaced);
    //form.action = "/bets/";
    //form.method = "post";
    let l = document.createElement("label");
    let i = document.createElement("input");
    let s = document.createElement("input");
    l.innerHTML = '<label for="amount">Bet Amount:</label>';
    i.type = "number";
    i.class = "amount";
    s.type = "submit";
    s.value = "Place Bet";
    s.onclick = "return betPlaced()";
    form.appendChild(l);
    form.appendChild(i);
    form.appendChild(s);
    return form;
}

function betPlaced() {
    if (gameBetOn == null || teamBetOn == null) {
        alert("Select a team to bet on first");
    } else {
        alert("Bet on ".concat(gameBetOn, " and ", teamBetOn));
    }
}

function makeNewBet(gameDate, team1, team2, gameTime, homeLine, awayLine, gameID) {
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
    let moneyLineHTML = makeMoneyLine(team1, team2, homeLine, awayLine, gameID);
    let moneyLine = infoRow.insertCell("3");
    moneyLine.appendChild(moneyLineHTML);
    moneyLine.className = "betInfo"
    let amount = infoRow.insertCell("4");
    let formHTML = betForm();
    amount.appendChild(formHTML);
}