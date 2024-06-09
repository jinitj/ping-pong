const { findUserByUsername, validatePassword } = require('../../../services/authService');
const { generateToken } = require('../../../services/jwtService');
const playersDb = require('../../../db/players');
const { fixtures, semiFinals } = require('../../../db/tournaments');

const authController = {
    login : (req, res) => {
        const { username, password } = req.body;
        const user = findUserByUsername(username);
        
        if (user && validatePassword(password, user.password)) {
            const token = generateToken({ username: user.username, role: user.role });
            if(user.role==='user'){
                if(playersDb.joinedPlayers[user.username]){
                    return res.status(409).json({error: 'Already Logged In'});
                }
                playersDb.joinedPlayers[user.username] = {
                    "fixtures": {gameId: null, status: 0},
                    "semi-finals": {gameId: null, status: 0},
                    "finals": {gameId: null, status: 0},
                    "eliminated": false
                }
                playersDb["totalPlayerCount"]+=1;
                playersDb["totalActivePlayerCount"]+=1
                // playersDb.joinedPlayers.push({user:username});
                // playersDb.activePlayers.push({user:username});
                console.log(playersDb.totalActivePlayerCount, playersDb.joinedPlayers);
            }
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    }
}

module.exports = authController;