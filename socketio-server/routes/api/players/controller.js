const playersDb = require('../../../db/players')

const playerController = {

    playersCount : (req,res) => {
        return res.json({joined: playersDb.totalPlayerCount, active: playersDb.totalActivePlayerCount});
    }
}


module.exports = playerController