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

async function validate(){
    const weekSelected = document.getElementById('select-week').value;
    const getURL = 'http://localhost:3000/games/' + weekSelected;
    let gamesData = await fetch('http://localhost:3000/games/' + weekSelected);
    gamesData = await gamesData.json();
    document.getElementById('week-form').remove();
    
    const setOddsBody = document.getElementById('set-odds-body');
    gamesData.forEach(game => {
        const div = document.createElement('div');
        div.className('game');

    });
}

function init(){
    document.getElementById('week-form').onsubmit = validate;
}

window.onload = init;