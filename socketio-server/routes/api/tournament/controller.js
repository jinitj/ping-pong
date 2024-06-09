const playersDb  = require('../../../db/players');
const tournamentDb = require('../../../db/tournaments');
const matchService = require('../../../services/matchesService')
const { v4: uuidv4 } = require('uuid');
const reportingService = require('../../../services/reportingService');

const tournamentController = {
    startRounds : (req, res) => {
      try {
        if (Object.keys(playersDb.joinedPlayers).length < 0) {
          return res.status(400).json({ error: 'Not enough players to start a tournament' });
        }
        const activePlayers = JSON.parse(JSON.stringify(Object.keys(playersDb.joinedPlayers).filter(player => !playersDb.joinedPlayers[player].eliminated)));
        const shuffledPlayers = matchService.shufflePlayers(activePlayers);
        const matches = [];
        let currentRound = 'No Started'

        if(activePlayers.length%2==1){
          return res.status(403).json({error: "Wait for round to complete"});
        }
        if(activePlayers.length == 8){
          currentRound ='fixtures';
        }else if(activePlayers.length == 4){
          currentRound ='semi-finals';
        }else if(activePlayers.length == 2){
          currentRound ='finals';
        }else{
          return res.status(400).json({error: 'All Rounds Over'});
        }
        for (let i = 0; i < Math.floor(shuffledPlayers.length / 2); i++) {
          const offensivePlayer = shuffledPlayers[i * 2];
          const defensivePlayer = shuffledPlayers[i * 2 + 1];
          const matchId = uuidv4();
          matchService.createMatchEntry(matchId, offensivePlayer, defensivePlayer, currentRound);
        }
  
        return res.json(tournamentDb);
      } catch (error) {
        if(error.message === "Ongoing Match"){
          return res.status(403).json({error: error.message});
        }
      }
      
     
    // const currentRound = tournamentDb.currentRound;
    // const currentRoundMatches = {};
    // currentRoundMatches[currentRound] = {...matches};
    },


    getFinalReport : (req, res) => {
      console.log("building");
      const report = reportingService.getFinalReport();
      if(report){
        return res.json({report: report});
      }
      return res.status(404).json({error : "No Match Data Available"})
    },

    getMatchReport : (req, res) => {
      try {

        const {matchId} = req.params;
        const report = reportingService.getMatchReportById(matchId);
        if(report){
          return res.json({report:report});
        }
      } catch (error) {
        return res.status(400).json({error: error.message});
      }
     
      // if(report)
    }

}


module.exports = tournamentController