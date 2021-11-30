async function addStatistics() {
    let users = await fetch('http://localhost:3000/users/');
    users = await users.json()
    users = users.body;

    console.log(users);

    const totalUsersDiv = document.getElementById('total-users');

    const totalUsersText = document.createElement('h3');
    totalUsersText.innerHTML = users.length;

    totalUsersDiv.append(totalUsersText);
}