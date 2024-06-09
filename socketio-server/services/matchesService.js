const tournamentDb = require('../db/tournaments');
const playersDb = require('../db/players');

const matchService  = {
    shufflePlayers : (players) => {
        for (let i = players.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [players[i], players[j]] = [players[j], players[i]];
        }
        return players;
    },


    createMatchEntry : (uuid, player1, player2, currentRound) => {
      const onGoingMatch = Object.keys(tournamentDb).find(tournament => tournamentDb[tournament].gameStatus==1);
      if(onGoingMatch){
        throw Error("Ongoing Match");
      }

      if(playersDb.joinedPlayers[player1][currentRound]["gameId"] || playersDb.joinedPlayers[player2][currentRound]["gameId"]){
        throw Error("Ongoing Match");
      }
      tournamentDb[uuid] = {
        "player1": {"username": player1, "score": 0,"defenseLine": []},
        "player2": {"username": player2, "score": 0, "defenseLine": []},
        "winner": null,
        "gameStatus": 0,
        "offensivePlayer": player1,
        "defensivePlayer": player2,
        "tournamentName": currentRound,
        "id": uuid
      }

      tournamentDb[uuid][player1] = {"score": 0, "defenseLine": []}
      tournamentDb[uuid][player2] = {"score" : 0, "defenseLine": []}

      playersDb.joinedPlayers[player1][currentRound]["gameId"] = uuid;
      playersDb.joinedPlayers[player2][currentRound]["gameId"] = uuid;

      console.log(tournamentDb, playersDb.joinedPlayers);
    }
      

}


module.exports = matchService;