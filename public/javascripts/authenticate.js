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

    let user = await fetch('/users/' + email);
    user = await user.json();

    if(user.password === hashCode(password)) {
        document.cookie = "email=" + user.email;
        if(user.bookie)
            window.location.replace("/statistics");
        else
            window.location.replace("/profile");           
    } else {
        const checkExistingError = document.getElementById('sign-in-error');

        try {
            checkExistingError.remove();
        } catch(err) {}

        const error = document.createElement('h3');
        const card = document.getElementById('sign-in-card');

        error.id = 'sign-in-error';
        error.innerHTML = 'Email or password is incorrect.';
        error.style.color = 'red';

        card.appendChild(error);
    }
}

async function validateNewUser() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    let validNewUser = 1;
    
    let checkIfExistingUser = await fetch('/users/' + email);

    try {
        checkIfExistingUser = await checkIfExistingUser.json();
        validNewUser = -1;
    } catch(err) {
        validNewUser = 1;
    }

    if(email === "" || pass === "")
    validNewUser = 0;

    if(validNewUser === 1) {
        const user = JSON.stringify({
            email: email,
            bookie: false,
            password: pass,
            balance: 100
        });
    
        //Sends POST request to server
        let res = await fetch('/users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: user
        });

        await validateSignIn();

    } else {
        const checkExistingError = document.getElementById('sign-in-error');

        try {
            checkExistingError.remove();
        } catch(err) {}

        const error = document.createElement('h3');
        const card = document.getElementById('sign-in-card');

        error.id = 'sign-in-error';
        
        if(validNewUser === 0)
            error.innerHTML = 'Please enter a valid username and password.';
        else if(validNewUser === -1)
            error.innerHTML = 'User with email ' + email + ' already created.';
        
        error.style.color = 'red';

        card.appendChild(error);


    }
}