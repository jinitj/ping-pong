const express = require('express');
const { checkGameStatus, checkOpponent } = require('../../../services/gameService');
const middleware = require('../../../middleware/middleWare');
const controller = require('./controller')

const router = express.Router();

router.get('/status/:username', middleware.authMiddleware, controller.checkStatusForUser);
router.get('/opponent/:gameId', middleware.authMiddleware, middleware.roleMiddleware('user') , checkOpponent);
router.get('/admin-status', middleware.authMiddleware, middleware.roleMiddleware('admin'), (req, res) => {res.json({ status: 'Admin access granted' });});
router.get('/start/:matchId', middleware.authMiddleware, middleware.roleMiddleware('admin'), controller.startMatch);
router.post('/makeMove', middleware.authMiddleware, middleware.roleMiddleware('user'), controller.makeMove);
router.get('/checkLiveStatus/:matchId', middleware.authMiddleware, controller.checkLiveStatus);

module.exports = router;
