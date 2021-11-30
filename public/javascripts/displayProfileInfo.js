window.onload = init;
var balance = null;
var email = null;

async function init() {
    let balanceDisplay = document.getElementById("displayBalance");
    const cookie = document.cookie.split('=');
    email = cookie[0];
    console.log(cookie);
    fetch("/users/".concat(email))
    .then(res => res.json())
    .then(data => {
        balance = data["balance"];
        balanceDisplay.innerHTML = "Balance: $" + data["balance"];
        console.log(data);
    });
}

function setEmail(email) {
    document.getElementById("email").innerHTML = email;
}
function setName(name) {
    document.getElementById("name").innerHTML = name;
}
function setBalance(balance) {
    document.getElementById("balance").innerHTML = "$" + balance;
}
function setTotalDeposited(amount) {
    document.getElementById("totalDeposited").innerHTML = "$" + amount;
}
function setTotalWinnings(amount) {
    document.getElementById("totalWinnings").innerHTML = "$" + amount;
}
function setNumberBets(nBets) {
    document.getElementById("numberBets").innerHTML = nBets;
}

setTimeout(() => {
    setEmail(email);
    setName("Carl Saba");
    setBalance(balance);
    setTotalDeposited(55000);
    setTotalWinnings(33000);
    setNumberBets(6921);

    createBetDiv("5/26", "1:00 P.M. EST", "Patriots", "-115", "$15");
}, 1000);


function showPastBets() {

}

function createBetDiv(gameDate, gameTime, gamePick, odds, amount) {
    let infoRow = document.getElementById("oldBets").insertRow("1");
    let date = infoRow.insertCell("0");
    date.innerHTML = gameDate;
    date.className = "betInfo";
    let pick = infoRow.insertCell("1");
    pick.innerHTML = gamePick;
    pick.className = "betInfo";
    let time = infoRow.insertCell("2");
    time.innerHTML = gameTime;
    time.className = "betInfo";
    let odd = infoRow.insertCell("3");
    odd.innerHTML = odds;
    odd.className = "betInfo";
    let a = infoRow.insertCell("4");
    a.innerHTML = amount;
    a.className = "betInfo";
}