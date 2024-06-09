const playersInGame = [];
const playersTillNow = [];
const matchesInProgress = [];
const matchesTillNow = [];
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/router');
require("dotenv").config();


const app =express();
const server = http.createServer(app);
const corsOptions = {
    origin: `${process.env.APP_HOST}:3000`,
    // origin: 'http://172.20.10.2:3000',
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions));
app.use(bodyParser.json());

// REST API routes
app.use('/',routes);

const PORT = 4000;
server.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
