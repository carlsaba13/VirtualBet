[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=6274671&assignment_repo_type=AssignmentRepo)
# Final Project

## Due Tuesday, OCT 19, 2021

### Team: Jack Miller (Fullstack, PM), Yusef Abaza (Backend), Spencer Lander (Backend), Ryan Colflesh (Frontend), Carl Saba (Frontend)

### Requirements:
* User Roles: Bettor, Bookie
* Accounts: email, password, role, balance
* Database: MongoDB
* Library: Axios
* Outside REST API: ESPN
* Hosting: Heroku

### Functionality:
This app will be a sports betting platform for NFL games. Every week a bookie will set betting odds for each NFL game, and then bettors can place bets on the games with virtual currency. At the end of an NFL week, an API will get the results and post them on the website, which will then update the status of all bets for the week and pay out winnings to users. When the results come out, an email will be sent to every user who placed a bet with the results of their bets. Since this platform will use virtual currency, it will serve as a platform to help people improve their sports betting skills before placing bets with their actual money.

### Users
A user will either log in as a bookie or as a bettor.
The bettor will be able to select the game they want to bet on, then for each game view betting odds that the bookie is offering. They can choose to take any bet that the bookie is offering. When the weekly results are posted, the user will receive an email updating them on the status of their bet and their balance will either go up or down according to the result.
The bookie will be able to select the game they want to set odds for. Once the game is selected, the bookie can set odds for many different bets (spread, moneyline). The bookie will be able to see how many bettors placed bets, which type of bet (spread or moneyline), and which game. After each game, the bookie will see their overall profit or loss from bets for the game.

### Technical Design: 
#### Login:
The first thing any user does when they navigate to our site is log in to their account. If they don’t have an account they can create one, and will be assigned the role of bettor. If they are a bookie, they will have to be assigned that role by the website, they can’t choose it.
#### Profile Page - Bettor:
After logging in, a bettor will land on the profile page. This page will display their email address and balance. It will also allow them to add more to their balance with a deposit button. This page will also show any active and past bets the user has. The purpose of the profile page is for users to monitor their progress on the site.
#### Statistics Page - Bookie:
After logging in, a bookie will land on the statistics page. This page will display important statistics that show how the website is performing.
#### Bets Page - Bettor:
The bets page is where a bettor can place bets on games. Every week, once a bookie has set the odds, a bettor can see the moneyline for every game scheduled that week. If they wish to place a bet, they can select a game, select the team they wish to bet on, and choose the amount to wager (within their balance). They can do this for as many games as they would like in a given week. After the games have been played, users will be able to check the results of their bet in the profile page.
#### Set Odds Page - Bookie:
The bets page is where a bookie will do their job. For the week the bookie selects, the page will show the week’s NFL games. When this happens, a bookie must look at the scheduled games and set the moneyline for each game. Once the bookie inputs the correct odds, they can submit them and the website will be open for betting for the week’s games. 
#### How things work:
Game schedules and results will be fetched from an external REST API (ESPN)
Data about balances, bets, and games will be stored in a MongoDB database
Authentication will be performed by storing user data in the database, with the passwords hashed
Betting can take place from the time the odds are set (doesn’t prevent betting on past games for testing purposes)
Results will be fetched when users check their bet history


### Instructions
Link to Application: https://virtual-bet.herokuapp.com/
* First time users should create a new account by inputting their email and password and clicking the "Create New User" button
* Repeat users should sign in with their email and password
* New Users are assigned the Bettor role by default (the Bookie role is already assigned)
* Upon login, users will be taken to their profile page where they can see statistics on their bet history
* Bettors can also go to the bets page, where they can place bets on the current week's games

### Installation Instructions
* Clone the GitHub Repository
* In the terminal, type "npm install"
* To run, type "npm run start" in the terminal
