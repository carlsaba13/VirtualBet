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

//Handles week selection form submission
async function validate() {

    //Gets week value selected by user and fetches all games' info for that week
    const weekSelected = document.getElementById('select-week').value;
    const getURL = '/games/' + weekSelected;
    let gamesData = await fetch(getURL);
    gamesData = await gamesData.json();

    //Removes week selection form from the DOM
    document.getElementById('week-form').remove();

    console.log(gamesData);
    
    //Creates a new div and fills it with the games' info fetched, including a set odds button
    const setOddsBody = document.getElementById('set-odds-body');
    gamesData.forEach(async function (game) {

        //Creates game info container
        const gameInfoDiv = document.createElement('div');
        gameInfoDiv.className = 'game';
        
        //Creates header element for game name (ex. BOS v PHI) and appends it to the game info container
        const gameNameDiv = document.createElement('div');
        const gameName = document.createElement('h3');
        gameName.innerHTML = game.name;
        gameNameDiv.className = 'set-odds-game-name';
        gameNameDiv.appendChild(gameName);
        gameInfoDiv.appendChild(gameNameDiv);

        //Creates header element for game date and appends it to the game info container
        const gameDateDiv = document.createElement('div');
        const gameDate = document.createElement('h3');
        const dateString = new Date(game.date);
        gameDate.innerHTML = (dateString.getMonth() + 1) + "/" + dateString.getDate();
        gameDateDiv.className = 'set-odds-game-date';
        gameDateDiv.appendChild(gameDate);
        gameInfoDiv.appendChild(gameDateDiv);

        //Checks if odds have been already set for the game
        let oddsExist = await fetch('/odds/' + game.id);
        oddsExist = await oddsExist.text();
        console.log(oddsExist);
        
        //If odds haven't been set, create a new button to set odds and append it to the game info container
        if(oddsExist.length === 0) {
            const setML = document.createElement('button');
            setML.innerHTML = "Set Odds";
            setML.className = 'set-odds-button';
            setML.id = 'set-odds-button-' + game.id;
            
            const setOddsFormID = 'set-odds-form-game-' + game.id;
            setML.onclick = function() {
                loadSetOddsButtonInput(gameInfoDiv, setOddsFormID, game.id, setML.id);
            };
            gameInfoDiv.appendChild(setML);
        }

        //Appends entire game info container onto setOdds page
        setOddsBody.appendChild(gameInfoDiv);
    });
}

//Inserts a form to post odds for specified game into the DOM
function loadSetOddsButtonInput(div, setOddsFormID, gameID, setMLID) {
    
    //If the form is not currently on the DOM, create it and add it to the DOM
    if(document.getElementById(setOddsFormID) === null) {
        //Create the form element
        const form = document.createElement('form');
        form.className = 'set-odds-input-form';
        form.id = setOddsFormID;
        form.onsubmit = event.preventDefault();

        //Create the home odds text input element
        const homeInput = document.createElement('input');
        homeInput.type = 'text';
        homeInput.placeholder = 'Insert Home Odds';
        homeInput.id = 'home-odds-input-' + gameID;

        //Create the away odds text input element
        const awayInput = document.createElement('input');
        awayInput.type = 'text';
        awayInput.placeholder = 'Insert Away Odds';
        awayInput.id = 'away-odds-input-' + gameID;

        //Create the button input element
        const submit = document.createElement('input');
        submit.type = 'button';
        submit.name = 'Submit';
        submit.value = 'Submit';
        submit.className = 'set-odds-input-form-button';

        submit.onclick = function() {
            postOdds(gameID, homeInput.id, awayInput.id, setOddsFormID, setMLID);
            document.getElementById(setOddsFormID).remove();
            document.getElementById(setMLID).remove();
            alert("Odds set!");
        };
        
        //Append input and submit button to the form element and append form element to the game's info div
        form.appendChild(awayInput);
        form.appendChild(homeInput);
        form.appendChild(submit);
        div.appendChild(form);

    //Else, remove the already existing form from the DOM
    } else {
        document.getElementById(setOddsFormID).remove();
    }


}

//Sends POST request with inputted odds for specific game ID
async function postOdds(gameID, homeInputID, awayInputID, formID, setMLID) {
    //Creates JSON request body
    const odds = JSON.stringify({
        gameID: gameID,
        home: parseInt(document.getElementById(homeInputID).value),
        away: parseInt(document.getElementById(awayInputID).value)
    });

    //Debug JSON body output
    console.log(gameID);
    console.log(parseInt(document.getElementById(homeInputID).value));
    console.log(parseInt(document.getElementById(awayInputID).value));
    
    //Sends POST request to server
    const res = await fetch('/odds/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: odds
      });
      const content = await res.json();
    
    document.getElementById(formID).remove();
    document.getElementById(setMLID).remove();

    console.log(content);
}

//Loads validate function onto week form
async function init(){
    const cookie = document.cookie.split('=');

    if(cookie[0] === '') {
        document.getElementById('week-form').remove();
        const h1 = document.createElement('h1');
        h1.innerHTML = "You do not have access to this page.";
        document.getElementById('set-odds-body').appendChild(h1);
    }

    console.log(cookie);
    let user = await fetch('/users/' + cookie[1]);
    user = await user.json();

    console.log(user);

    if(user.bookie === true) {
        document.getElementById('week-form').onsubmit = validate;
    } else {
        document.getElementById('week-form').remove();
        const h1 = document.createElement('h1');
        h1.innerHTML = "You do not have access to this page.";
        document.getElementById('set-odds-body').appendChild(h1);
    }

}

window.onload = init;