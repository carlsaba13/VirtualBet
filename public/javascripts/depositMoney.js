window.onload = init;
var email = null;
var balance = null;

async function init() {
    const cookie = document.cookie.split('=');
    email = cookie[0];
    console.log(cookie);
    fetch("/users/".concat(email))
    .then(res => res.json())
    .then(data => {
        balance = data["balance"];
        console.log(data);
    });
}