async function validateSignIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    let user = await fetch('http://localhost:3000/users/' + email);
    user = await user.json();

    document.cookie = "email=" + user.email;

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