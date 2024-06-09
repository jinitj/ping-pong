const express = require('express')
const router = express.Router();
const controller = require('./controller');
const middleWare = require('../../../middleware/middleWare')

router.use('/start',middleWare.authMiddleware,controller.startRounds);
router.use('/getFinalReport',middleWare.authMiddleware,controller.getFinalReport);
router.use('/getMatchReport/:matchId',middleWare.authMiddleware,controller.getMatchReport)

module.exports = router;