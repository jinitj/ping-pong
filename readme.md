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
2. `npm start`

To start the frontend on LAN (e.g., WiFi):
1. `cd Socket-IO-Template-main/frontend`
2. Go to the `.env` file of frontend code and replace the value of `REACT_APP_HOST` with your server IP.
3. Go to `package.json` inside `Socket-IO-Template-main/frontend` and add a key on the root level: `"proxy": "http://<your-ip>:4000"`.
4. `npm start HOST="<your-ip>"`

Now the frontend is up and running.

### Backend Server Setup

To start the backend server on localhost:
1. `cd socketio-server`
2. `npm run debug` (there is a debug script inside the code which will be present in the folder `.vscode`, and it is not added to `.gitignore`).

To start the backend on LAN (e.g., WiFi):
1. `cd socketio-server`
2. Go to the `.env` file of backend code and replace the value of `APP_HOST` with your IP.
3. `npm run debug`