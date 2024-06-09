const express = require('express');
// const { checkGameStatus, checkOpponent } = require('../../../services/gameService');
const middleware = require('../../../middleware/middleWare');
const controller = require('./controller');

const router = express.Router();

router.get('/count', controller.playersCount);
module.exports = router;
