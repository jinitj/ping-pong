const express = require('express');
const router = express.Router();
const gameRouter = require('./games/route');
const middleWare = require('../../middleware/middleWare');
const authRouter = require('./auth/route');
const playersRouter = require('./players/route')
const tournamentRouter = require('../api/tournament/route');


router.use('/auth',  authRouter);
router.use('/game', middleWare.authMiddleware, gameRouter);
router.use('/players',middleWare.authMiddleware, playersRouter)
router.use('/tournament',middleWare.authMiddleware, tournamentRouter)


module.exports = router;