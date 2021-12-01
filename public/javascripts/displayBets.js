var teamBetOn = null;
var gameBetOn = null;
var betHome = null;
var week = null;
var email = null;
var balance = null;

window.onload = init;

async function init() {
    let balanceDisplay = document.getElementById("displayBalance");
    const cookie = document.cookie.split('=');
    email = cookie[1];
    //console.log(cookie);
    fetch("/users/".concat(email))
    .then(res => res.json())
    .then(data => {
        balance = data["balance"];
        balanceDisplay.innerHTML = "Balance: $" + data["balance"];
    });
}

const selectWeek = document.getElementById('select-week');

//Test list for dynamically updating the DOM
//TODO: use fetch to get applicable weeks
const weekList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

//Adds applicable weeks to option list
for(let i = 0; i < weekList.length; i++) {
    const opt = document.createElement('option');
    opt.value = weekList[i];
    opt.innerHTML = weekList[i];
    selectWeek.appendChild(opt);
}

function validateWeek(){
    new Promise(function(resolve, reject) {
        week = document.getElementById('select-week').value;
        resolve(week);
    })
    .then(week => {
        getGames(week);
        document.getElementById("set-odds-body").remove();
    });
    
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
                makeNewBet(date, team1, team2, time, awayOdds, homeOdds, gameID);
            }).catch(error => console.log(error));    
            
        }
        //console.log(JSON.stringify(data))
    });
}

function makeMoneyLine(team1, team2, line1, line2, gameID) {
    console.log(gameID);
    let table = document.createElement("table");
    table.className = "table";
    let teams = table.insertRow("0");
    teams.outerHTML = "<th>" + team1 + "</th><th>" + team2 + "</th>";
    let moneyLine = table.insertRow("1");
    let moneyLine1 = moneyLine.insertCell("0");
    let moneyLine2 = moneyLine.insertCell("1");
    if (line1 > 0) {
        button1 = makeButton("+" + line1, team1, gameID, false);
    } else {
        button1 = makeButton(line1, team1, gameID, false);
    }
    if (line2 > 0) {
        button2 = makeButton("+" + line2, team2, gameID, true);
    } else {
        button2 = makeButton(line2, team2, gameID, true);
    }

    
    let td1 = document.createElement("td");
    td1.appendChild(button1);
    let td2 = document.createElement("td");
    td2.appendChild(button2);
    moneyLine1.appendChild(td1);
    moneyLine2.appendChild(td2);
    return table;
}

function makeButton(odd, team, gameID, home) {
    let buttonObj = document.createElement("button");
    buttonObj.type = "button";
    buttonObj.innerHTML = odd;
    buttonObj.className = "button";
    buttonObj.addEventListener("click", function() {
        teamBetOn = team;
        gameBetOn = gameID;
        betHome = home;
        console.log(team);
        console.log(gameID);
      });
    return buttonObj;
}

function betForm(odds1, odds2) {
    let form = document.createElement("form");
    //form.action = "/bets/";
    //form.method = "post";
    let l = document.createElement("label");
    let i = document.createElement("input");
    let s = document.createElement("input");
    l.innerHTML = '<label for="amount">Bet Amount:</label>';
    i.type = "number";
    i.min = 1;
    i.max = balance;
    i.class = "amount";
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (gameBetOn == null || teamBetOn == null || !i.value) {
            console.log("You need to select a bet amount and a team to bet on");
        } else {
            var o = null;
            if (betHome) {
                o = odds2;
            } else {
                o = odds1;
            }
            const myInit =    
                {
                email: email,
                gameID: parseInt(gameBetOn),
                week: parseInt(week),
                home: betHome,
                odds: parseInt(o),
                amount: parseInt(i.value),
                victory: null
                };
            console.log(myInit);
            fetch('/bets', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(myInit)
            }).then(res => {
                if (res.status == 201) {
                    alert("Bet $" + i.value + " on the " + teamBetOn);
                    location.reload();
                } else {
                    alert(res.status);
                }
            });
        }
    });
    s.type = "submit";
    s.value = "Place Bet";
    s.className = "button"
    s.onclick = "return betPlaced()";
    form.appendChild(l);
    form.appendChild(i);
    form.appendChild(s);
    return form;
}

function betPlaced(i) {
    
}

function makeNewBet(gameDate, team1, team2, gameTime, homeLine, awayLine, gameID) {
    let infoRow = document.getElementById("betOffer").insertRow("1");
    let date = infoRow.insertCell("0");
    date.innerHTML = gameDate;
    date.className = "betInfo"
    let teams = infoRow.insertCell("1");
    teams.innerHTML = team2 + " @ " + team1;
    teams.className = "betInfo"
    let time = infoRow.insertCell("2");
    time.innerHTML = gameTime;
    time.className = "betInfo"
    let moneyLineHTML = makeMoneyLine(team1, team2, awayLine, homeLine, gameID);
    let moneyLine = infoRow.insertCell("3");
    moneyLine.appendChild(moneyLineHTML);
    moneyLine.className = "betInfo"
    let amount = infoRow.insertCell("4");
    let formHTML = betForm(awayLine, homeLine);
    amount.appendChild(formHTML);
}