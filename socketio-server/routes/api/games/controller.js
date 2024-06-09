
const { checkGameStatus, startGame , validateAndMakeMove, checkLiveGameStatus} = require('../../../services/gameService');

const gameController = {

    checkStatusForUser : (req, res) => {
        try {
            const {username} = req.params;
            if(!username){
                return res.status(400).json({error:"Please Mention User Details"});
            }
            const resp = checkGameStatus(username)
            if(!resp){
                return res.status(202).json({ message: 'Your Next Match Will Start Soon' });
            }
            return res.json({resp});
        } catch (error) {
            if (error.message === "Player is knocked out") {
                return res.status(403).json({ error: error.message });
            }
        }
        
    },


    startMatch : (req, res) => {
        try {
            const {matchId} = req.params;
            if(!matchId){
                return res.status(400).json({error:"Match id required"});
            } 

            const resp = startGame(matchId);
            if(resp){
                return res.json({"status":"Match Started"});
            }
        } catch (error) {
            if (error.message === "Match Ended") {
                return res.status(403).json({ error: error.message });
            }
            if (error.message === "Match Already Started") {
                return res.status(400).json({ error: error.message });
            }
            
        }
    },


    makeMove: (req, res) => {
        try {
            const { username, matchId } = req.body;
            console.log(matchId);
            if(!username || !matchId){
            return res.status(400).json({error: "Username or MatchId Missing"});
        }


        const resp = validateAndMakeMove(username, matchId);
        return res.json({resp});
        } catch (error) {
            if(error.message === "Wait for your turn"){
                return res.status(400).json({ error: error.message });
            }
            if(error.message === "You are not part of this match"){
                return res.status(400).json({ error: error.message });

            }

            if(error.message === "Player is knocked out"){
                return res.status(400).json({ error: error.message });

            }

            if(error.message === "Match Over"){
                return res.status(400).json({ error: error.message });

            }
        }
        
    },

    checkLiveStatus : (req, res) => {
        try {
            const {matchId} = req.params;
            if(!matchId){
                return res.status(400).json({error:"Please Mention Match Details"});
            }
            const resp = checkLiveGameStatus(matchId);
            if(!resp){
                return res.status(202).json({ status: 'Game not started yet' });
            }
            return res.json({resp});
        } catch (error) {
            if (error.message === "Match Ended") {
                return res.status(403).json({ error: error.message });
            }
        }
    }
}


module.exports = gameController