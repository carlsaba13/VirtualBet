async function addStatistics() {
    //Add total number of users
    /* let users = await fetch('/users/');
    users = await users.json()
    users = users.body;

    console.log(users); */

    const totalUsersDiv = document.getElementById('total-users');

    const totalUsersText = document.createElement('h1');
    //totalUsersText.innerHTML = users.length;
    totalUsersText.innerHTML = 'Total Users: ' + '56';

    totalUsersDiv.appendChild(totalUsersText);

    //Add total number of bets
    const betsPlacedDiv = document.getElementById('bets-placed');
    const totalBetsText = document.createElement('h1');
    totalBetsText.innerHTML = 'Total Bets Placed: ' + '145';
    betsPlacedDiv.appendChild(totalBetsText);

    //Add total number of bets won
    const betsWonDiv = document.getElementById('bets-won');
    const totalBetsWonText = document.createElement('h1');
    totalBetsWonText.innerHTML = 'Total Bets Won: ' + '73';
    betsWonDiv.appendChild(totalBetsWonText);

    //Add Net Profit
    const netProfitDiv = document.getElementById('net-profit');
    const netProfitText = document.createElement('h1');
    netProfitText.innerHTML = 'Net Profit: $' + '7';
    netProfitDiv.appendChild(netProfitText);

    //Add Average Bet Amount
    const avgBetDiv = document.getElementById('avg-bet');
    const avgBetText = document.createElement('h1');
    avgBetText.innerHTML = 'Average Bet Amount: $' + '45';
    avgBetDiv.appendChild(avgBetText);

    //Add Average Profit Per Bet
    const avgProfitDiv = document.getElementById('avg-profit-per-bet');
    const avgProfitText = document.createElement('h1');
    avgProfitText.innerHTML = 'Average Profit Per Bet: $' + '0.02';
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