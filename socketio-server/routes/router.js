const express = require('express');
const router = express.Router();
const gameRouter = require('./api/games/route');
const apiRouter = require('./api/apiRouter');

router.use('/api',apiRouter)


module.exports = router;





