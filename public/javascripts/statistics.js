async function addStatistics() {
    //Add total number of users
    let users = await fetch('/users/');
    users = await users.json()
    users = users.body;

    const totalUsersDiv = document.getElementById('total-users');

    const totalUsersText = document.createElement('h3');
    totalUsersText.innerHTML = users.length;

    totalUsersDiv.append(totalUsersText);

    //Add total number of bets
    let bets = []



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
    }

}

window.onload = init;