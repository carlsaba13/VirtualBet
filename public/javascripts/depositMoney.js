window.onload = init;
var email = null;
var balance = null;

async function init() {
    let balanceDisplay = document.getElementById("displayBalance");
    let form = document.getElementById("realDepositForm");
    let i = document.getElementById("depositForm");
    const cookie = document.cookie.split('=');
    email = cookie[1];
    console.log(cookie);
    fetch("/users/".concat(email))
    .then(res => res.json())
    .then(data => {
        balance = data["balance"];
        balanceDisplay.innerHTML = "Balance: $" + data["balance"];
        console.log(data);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!i.value) {
            alert("You have to insert an amount to bet first");
        } else {
            const myInit = {
                deposit: parseInt(i.value)
            };
            fetch('/users/'.concat(email), {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(myInit)
            }).then(res => {
                if (res.status == 201) {
                    alert("Successfully deposited $" + i.value)
                    window.location.replace("/profile");
                } else {
                    alert(res.status);
                }
            });
        }
    })
}