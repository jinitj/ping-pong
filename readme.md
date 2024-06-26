Platform summary

### Available Endpoints

1. **/api/auth/login (POST)**  
   Not admin sensitive. Endpoint to login to the platform.  
   Required Info: `username`, `password`  
   Possible status codes:  
   - `200`: Valid username and password.
   - `409`: User already logged in.
   - `401`: Not authorized (e.g., token expired, wrong username/password).

2. **/api/tournament/start (GET)**  
   Admin sensitive. Endpoint starts new tournament rounds, e.g., semi-finals, finals.  
   Possible status codes:  
   - `400`: Not enough players joined.
   - `400`: All matches are over.
   - `401`: User is not admin (controlled by middleware).
   - `403`: A round is already ongoing, thus forbidding the request.
   - `200`: If all the above cases bypassed, match info in response.

3. **/api/players/count (GET)**  
   Endpoint gives count of joined and current active players in the game.  
   Possible status code:  
   - `200`: Response of total players joined the system.

4. **/api/game/start/:matchId (GET)**  
   Admin sensitive. Endpoint to start a match after it is created for players to make moves.  
   Possible status codes:  
   - `400`: Invalid match ID sent in request.
   - `400`: Trying to start an ongoing match.
   - `401`: Any user other than admin tries to perform activity.
   - `403`: Trying to start an ended match.
   - `200`: If all above cases bypassed, response with started match info.

5. **/api/game/checkLiveStatus/:matchId (GET)**  
   Endpoint to get real-time updates of a particular match.  
   Possible status codes:  
   - `400`: Match ID not passed.
   - `202`: Game not started yet.
   - `200`: If all above cases passed, response with live match returned.

6. **/api/game/status/:user (GET)**  
   User ID sensitive. Endpoint to get the live status of ongoing game the user is part of.  
   Possible status codes:  
   - `400`: User ID missing.
   - `403`: Player eliminated.
   - `202`: Player's match not yet started.
   - `200`: If bypass all above cases, match details sent in response.

7. **/api/game/makeMove (POST)**  
   User and user ID sensitive. Endpoint to make a move.  
   Possible status codes:  
   - `400`: User ID and match ID missing.
   - `400`: Current player is defensive (i.e., it is the other player's turn to play).
   - `400`: Player is trying to make a move in a match they are not part of.
   - `400`: Player knocked out.
   - `400`: Match is over.
   - `200`: If all above cases bypassed, match details returned.

8. **/api/tournament/getMatchReport/:matchId (GET)**  
   To get a report of a particular match.  
   Possible status codes:  
   - `400`: Invalid match ID requested.
   - `200`: Live match info returned.

9. **/api/tournament/getFinalReport (GET)**  
   To get a report of all matches created, ongoing, and finished in the system.  
   Possible status codes:  
   - `404`: No match info available.
   - `200`: All matches info returned.

### Frontend Server Setup

To start the frontend server on localhost:
1. `cd Socket-IO-Template-main/frontend`
2. `npm i`
3. `npm start`

To start the frontend on LAN (e.g., WiFi):
1. `cd Socket-IO-Template-main/frontend`
2. `npm i`
3. Go to the `.env` file of frontend code and replace the value of `REACT_APP_HOST` with your server IP.
4. Go to `package.json` inside `Socket-IO-Template-main/frontend` and add a key on the root level: `"proxy": "http://<your-ip>:4000"`.
5. `npm start HOST="<your-ip>"`

Now the frontend is up and running.

### Backend Server Setup

To start the backend server on localhost:
1. `cd socketio-server`
2. `npm i`
3. `npm run debug` (there is a debug script inside the code which will be present in the folder `.vscode`, and it is not added to `.gitignore`).

To start the backend on LAN (e.g., WiFi):
1. `cd socketio-server`
2. `npm i`
3. Go to the `.env` file of backend code and replace the value of `APP_HOST` with your IP.
4. `npm run debug`


Here's the updated README-compatible section about the game, including the available users and how to play the game:

### About the Game

The available users with their usernames, passwords, and roles are as follows:

- **Eliud**: 
  - Username: Eliud 
  - Password: Eliud 
  - Role: Player

- **Mo**: 
  - Username: Mo 
  - Password: Mo 
  - Role: Player

- **Mary**: 
  - Username: Mary 
  - Password: Mary 
  - Role: Player

- **Usain**: 
  - Username: Usain 
  - Password: Usain 
  - Role: Player

- **Paula**: 
  - Username: Paula 
  - Password: Paula 
  - Role: Player

- **Galen**: 
  - Username: Galen 
  - Password: Galen 
  - Role: Player

- **Shalane**: 
  - Username: Shalane 
  - Password: Shalane 
  - Role: Player

- **Haile**: 
  - Username: Haile 
  - Password: Haile 
  - Role: Player

- **Admin**: 
  - Username: Admin 
  - Password: Admin 
  - Role: Referee

**Note**: Use the above credentials to log in to the game. There is no signup option.

### How to Play the Game

1. The players and referee log in using their credentials.
2. The referee, when 8 players have joined, creates the first set of matches for the tournament by clicking "Start Tournament". The matches will get created if 2^x players are available (e.g., 8, 4, 2). For 8 players, the rounds will be fixtures, semi-finals, and finals; for 4 players, the rounds will be semi-finals and finals; for 2 players, only the final round will be created.
3. Players can check the status of the match they have been allotted.
4. Players play the match using the "make move" button.
5. Players are notified of the change in match state after their move. They are also notified if it is not their turn to play.
6. The referee/admin can see the match report using the report button.


