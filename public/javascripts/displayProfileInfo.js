window.onload = init;
var balance = null;
var email = null;

async function init() {
    let balanceDisplay = document.getElementById("displayBalance");
    const cookie = document.cookie.split('=');
    email = cookie[1];
    console.log(cookie);
    console.log(email);
    fetch("/users/".concat(email))
    .then(res => res.json())
    .then(data => {
        balance = data["balance"];
        balanceDisplay.innerHTML = "Balance: $" + data["balance"];
        console.log(data);
        setBalance(data["balance"]);
    });
    setEmail(email);
    //setName("Carl Saba");
    
    //setTotalDeposited(55000);
    //setTotalWinnings(33000);
    //setNumberBets(6921);

    //createBetDiv("5/26", "1:00 P.M. EST", "Patriots", "-115", "$15");
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
        document.getElementById("set-odds-body").remove();
        showPastBets(week);
    });
    
}

function setEmail(email) {
    document.getElementById("email").innerHTML = email;
}
function setBalance(balance) {
    document.getElementById("balance").innerHTML = "$" + balance;
}


function showPastBets(week) {
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
            fetch('/bets/'.concat(email))
            .then(res => res.json())
            .then(betData => {
                for (j in betData) {
                    console.log(betData[j]);
                    let game = betData[j];
                    if (game["gameID"] == gameID) {
                        if (game["home"]) {
                            createBetDiv(date, team1 + " @ " + team2, time, team2, game["odds"], game["amount"], game["victory"]);
                        } else {
                            createBetDiv(date, team1 + " @ " + team2, time, team1, game["odds"], game["amount"], game["victory"]);
                        }
                        
                    }
                }
            });
        }
    });
}

function createBetDiv(date, teams, time, pick, odds, amount, victory) {
    let infoRow = document.getElementById("oldBets").insertRow("1");
    let d = infoRow.insertCell("0");
    d.innerHTML = date;
    d.className = "betInfo";
    let t = infoRow.insertCell("1");
    t.innerHTML = teams;
    t.className = "betInfo";
    let tim = infoRow.insertCell("2");
    tim.innerHTML = time;
    tim.className = "betInfo";
    let p = infoRow.insertCell("3");
    p.innerHTML = pick;
    p.className = "betInfo";
    let o = infoRow.insertCell("4");
    o.innerHTML = odds;
    o.className = "betInfo";
    let a = infoRow.insertCell("5");
    a.innerHTML = "$" + amount;
    a.className = "betInfo";
    let v = infoRow.insertCell("6");
    if (victory == null) {
        v.innerHTML = "pending";
    } else {
        v.innerHTML = victory;
    }
    v.className = "betInfo";
}