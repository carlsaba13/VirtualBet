async function addStatistics() {
    //Add total number of users
    let users = await fetch('/users/');
    users = await users.json()

    console.log(users);

    const totalUsersDiv = document.getElementById('total-users');

    const totalUsersText = document.createElement('h1');
    totalUsersText.innerHTML = 'Total Users: ' + users.length;
    totalUsersDiv.appendChild(totalUsersText);

    //Add total number of bets
    let bets = [];
    console.log(typeof bets);

    for(const user of users) {
        let betsFetch = await fetch('/bets/' + user.email);
        betsFetch = await betsFetch.json();
        betsFetch.forEach(bet => {
            bets.push(bet);
        });
    }

    console.log(bets);

    const betsPlacedDiv = document.getElementById('bets-placed');
    const totalBetsText = document.createElement('h1');
    totalBetsText.innerHTML = 'Total Bets Placed: ' + bets.length;
    betsPlacedDiv.appendChild(totalBetsText);

    //Add total number of bets won
    let betsWon = 0;

    bets.forEach(bet => {
        if(bet.victory === true)
            betsWon++;
    });

    const betsWonDiv = document.getElementById('bets-won');
    const totalBetsWonText = document.createElement('h1');
    totalBetsWonText.innerHTML = 'Total Bets Won: ' + betsWon;
    betsWonDiv.appendChild(totalBetsWonText);

    //Add Net Profit
    let netProfit = 0

    bets.forEach(bet => {
        let amt = bet.amount;
        let odds = bet.odds;
        if(bet["victory"]) {
            if(odds < 0){
                odds *= -1;
                netProfit -= Math.ceil(((odds+100)/odds)*amt) + amt;
            }
            else{
                netProfit -= Math.ceil(((odds+100)/100)*amt) + amt;
            }
        }
        else if(bet["victory"] === false){
            netProfit += amt;
        }
    })

    const netProfitDiv = document.getElementById('net-profit');
    const netProfitText = document.createElement('h1');
    netProfitText.innerHTML = 'Net Profit: $' + netProfit;
    netProfitDiv.appendChild(netProfitText);

    //Add Average Bet Amount
    let avgBetAmount = 0;

    bets.forEach(bet => {
        avgBetAmount += bet.amount;
    });

    avgBetAmount /= bets.length;

    const avgBetDiv = document.getElementById('avg-bet');
    const avgBetText = document.createElement('h1');
    avgBetText.innerHTML = 'Average Bet Amount: $' + avgBetAmount;
    avgBetDiv.appendChild(avgBetText);

    //Add Average Profit Per Bet
    const avgProfitDiv = document.getElementById('avg-profit-per-bet');
    const avgProfitText = document.createElement('h1');
    let avgProfit = netProfit / bets.length;
    avgProfitText.innerHTML = 'Average Profit Per Bet: $' + avgProfit;
    avgProfitDiv.appendChild(avgProfitText);


}

//Loads validate function onto week form
async function init(){
    const cookie = document.cookie.split('=');

    if(cookie[0] === '') {
        const h1 = document.createElement('h1');
        h1.innerHTML = "You do not have access to this page.";
        document.getElementById('stats-body').appendChild(h1);
    }

    console.log(cookie);
    let user = await fetch('/users/' + cookie[1]);
    user = await user.json();

    if(user.bookie === 0) {
        const h1 = document.createElement('h1');
        h1.innerHTML = "You do not have access to this page.";
        document.getElementById('stats-body').appendChild(h1);
    } else {
        addStatistics();
    }

}

window.onload = init;