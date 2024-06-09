The ping pong app has a seperate backend and frontend server

Frontend
To start the frontend server on localhost enter the following steps in terminal
1. command: cd Socket-IO-Template-main/frontend
2. command: npm  start 


To start the frontend on LAN e.g. wifi  do the following steps
1. command: cd Socket-IO-Template-main/frontend
2. Go to .env file of frontend code and replace value of REACT_APP_HOST by your server ip
3. go to package json inside Socket-IO-Template-main/frontend and add a key on root level "proxy": "http://192.168.1.101:4000", replace the ip by your ip
4. command: npm start HOST="192.168.1.101", replace by your ip 

Now the frontend is up and running

Backend 
To start the backend server on localhost enter the following steps on a seperate terminal
1. command: cd socketio-server
2. command: npm run debug (there is a debug script also inside the code which will be present in folder .vscode i wont be adding it to gitignore)

To start the backend on LAN e.g. wifi do the following steps
1. command: cd socketio-server
2. Go to .env file of backend code and replace value of APP_HOST by you ip 
3. command : npm run debug




Available Endpoints
1. /api/auth/login (POST), not admin sensitive, Endpoint to login on the platform
    Required Info username , password
    Possible status codes
    200  : if valid username and password
    409: if user already logged in
    401: not authorized , e.g. token expired , wrong un,password

2. /api/tournament/start (GET), admin sensitive, endpoint starts the new tournament rounds, e.g. semi-finals, finals
    400: if not enough players joined
    400: if all the matches are over
    401: if user is not admin, this is controlled by middleware
    403: if a round is already on going, thus forbidding the request
    200: if all of the above cases bypassed and match info in response


3. /api/players/count (GET), EP gives count of joined and current active players in the game 
    200: response of total players joined the system

4. /api/game/start/:matchId (GET), admin sensitive , EP to start a match after it is created for players to make moves
    400: If invalid match id sent in request
    400: if trying to start ongoing match
    401: if any user other than admin try to perform activity
    403: if trying to start a ended match
    200: if all above cases bypassed , resp started match info


5. /api/game/checkLiveStatus/:matchId (GET),  EP to get real time updates of a particular match
    400: if matchId not passed
    202: if game not started yet
    200: if all above cases passed, resp of live match returned


6. /api/game/status/:user (GET) , userid sensitive ,  EP to get the live status of ongoing game the user is part of 
    400: if userid missing
    403: if player eliminated
    202: if players match not yet started
    200: if bypass all above cases, match details sent in resp

    


7. /api/game/makeMove (POST) , user and userid sensitive, EP to make move
    400: if userid and matchid missing
    400: if current player is defensive i.e. it is other players turn to play
    400: if player is trying to make move on match he/she not part of
    400: if player knocked out
    400: if match is ove
    200: if all above cases bypassed , match details returned


8. /api/tournament/getMatchReport/:matchId (GET) , To get report of a particular match
    400: if invalid match id requested
    200: live match info returned

9. /api/tournament/getFinalReport (GET), to get report of all matches created, ongoing and finished in the system
    404: if no match info available
    200: all  matches info returned
