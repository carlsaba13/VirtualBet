const selectWeek = document.getElementById('select-week');

console.log("test setOdds");

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

