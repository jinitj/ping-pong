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
