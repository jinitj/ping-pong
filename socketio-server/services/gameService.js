const playersDb = require('../db/players');
const tournamentDb = require('../db/tournaments')
const constants = require('../../constants');

const createDefenceLine = (length) => {
  const defenseSet =  new Set();
  while(defenseSet.size<length){
    defenseSet.add(Math.floor(Math.random() * 10) + 1);
  }

  return Array.from(defenseSet);
}
  const checkGameStatus = (userName) => {
    const playerDetails = playersDb.joinedPlayers[userName];
    if(playerDetails.eliminated){
      throw Error("Player is knocked out");
    }

    for(const round of constants.rountTypes){
      const roundDetails = playerDetails[round]
      if(roundDetails.gameId &&  roundDetails.status!=2){
        const tournamentDetails = tournamentDb[roundDetails.gameId];
        if(!tournamentDetails){
          return null;
        }
        return tournamentDetails;
      }
    }

    return null;

    
  };
  
  const checkLiveGameStatus = (matchId) => {
    const tournamentDetails = tournamentDb[matchId];
    // if(tournamentDetails.gameStatus==2){
    //   throw Error("Match Ended");
    // }

    return tournamentDetails;
  }
  const checkOpponent = (req, res) => {
    const { gameId } = req.params;
    const userId = req.user.id;
    const game = games.find(g => g.gameId === gameId);
  
    if (game) {
      const opponent = game.players.find(player => player.id !== userId);
      if (opponent) {
        return res.json({ opponent: opponent.name });
      } else {
        return res.status(404).json({ error: 'Opponent not found' });
      }
    } else {
      return res.status(404).json({ error: 'Game not found' });
    }
  };

  const startGame  = (matchId) => {
    const tournamentDetails = tournamentDb[matchId];
    console.log(tournamentDetails);
    if(tournamentDetails.gameStatus==2){
      throw Error("Match Ended");
    }

    if(tournamentDetails.gameStatus==1){
      throw Error("Match Already Started");
    }

    const player1ID = tournamentDetails.player1.username;
    const player2ID = tournamentDetails.player2.username
    const player1ArmyLength = constants.playerDefenseMap[tournamentDetails.player1.username];
    const player2ArmyLength = constants.playerDefenseMap[tournamentDetails.player2.username];
    const player1Army = createDefenceLine(player1ArmyLength);
    const player2Army = createDefenceLine(player2ArmyLength)
    tournamentDetails.player1.defenseLine.push(...player1Army);
    tournamentDetails.player2.defenseLine.push(...player2Army);
    tournamentDetails[player1ID].defenseLine.push(...player1Army);
    tournamentDetails[player2ID].defenseLine.push(...player2Army);
    tournamentDetails.gameStatus = 1;

    console.log(tournamentDetails);
    return true;
  };

  const validateAndMakeMove = (username, matchId) => {
    const playerDetails = playersDb.joinedPlayers[username];
    const tournamentDetails = tournamentDb[matchId];

    //player already eliminated
    if(playerDetails.eliminated){
      throw Error("Player is knocked out");
    }

    //match expired or invalud match id
    if(!tournamentDetails || tournamentDetails.gameStatus==2){
      throw Error("Match Over");
    }

    //player not part of match
    if(!(tournamentDetails.player1.username===username || tournamentDetails.player2.username===username)){
      throw Error("You are not part of this match");
    }

    //player is defensive player at the moment
    if(tournamentDetails.offensivePlayer!==username){
      throw Error("Wait for your turn");
    }

    const randomNumber = Math.floor(Math.random() * 10) + 1;


    const defensivePlayer = tournamentDetails.defensivePlayer;
    const offensivePlayer = tournamentDetails.offensivePlayer;
    if(tournamentDetails[defensivePlayer].defenseLine.includes(randomNumber)){
      tournamentDetails[defensivePlayer].score+=1;
      tournamentDetails.offensivePlayer =defensivePlayer;
      tournamentDetails.defensivePlayer = offensivePlayer;
    }else{
      tournamentDetails[offensivePlayer].score+=1;
    }

    if(tournamentDetails[defensivePlayer].score==5 || tournamentDetails[offensivePlayer].score==5 ){
      const [winner, loser] = tournamentDetails[defensivePlayer].score == 5 ? [defensivePlayer, offensivePlayer] : [offensivePlayer, defensivePlayer];
      tournamentDetails.winner = winner;
      tournamentDetails.gameStatus = 2;
      playersDb.joinedPlayers[loser].eliminated = true;
      playersDb.joinedPlayers[winner][tournamentDetails.tournamentName].status = 2
      playersDb.joinedPlayers[loser][tournamentDetails.tournamentName].status = 2
      return {message: "Match Over", tournamentDetails}
    }

    return {message: "Next Move", tournamentDetails};
  }


  
  

  module.exports = { checkGameStatus, checkOpponent, startGame, validateAndMakeMove , checkLiveGameStatus};
  