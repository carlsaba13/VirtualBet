//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hashCode (str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
}

async function validateSignIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    let user = await fetch('http://localhost:3000/users/' + email);
    user = await user.json();

    if(user.password === hashCode(password)) {
        document.cookie = "email=" + user.email;
        if(user.bookie)
            window.location.replace("http://localhost:3000/statistics");
        else
            window.location.replace("http://localhost:3000/profile");           
    } else {
        alert("Incorrect username or password.");
    }

    console.log(user);

}

async function validateNewUser() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    const user = JSON.stringify({
        email: email,
        bookie: false,
        password: pass,
        balance: 100
    });

    //Sends POST request to server
    const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: user
    });

    const content = await res.json();
}