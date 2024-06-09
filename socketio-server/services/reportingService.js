const tournamentDb = require('../db/tournaments');


const reportingService = {

    getMatchReportById : (matchId) => {
        const tournament = tournamentDb[matchId];
        if(tournament){
            return tournament;
            console.log(tournament);
        }else{
            throw Error("Invalid Match")
        }
        
    },


    getTournamentReport : () => {
        
    },

    getFinalReport : () => {
        if(!tournamentDb || Object.keys(tournamentDb).length<1){
            return null;
        }
        const report = [];
        console.log(tournamentDb);
        for(const matchId of Object.keys(tournamentDb)){
            const match = tournamentDb[matchId];
            if(match){
                report.push({
                    player1: match.player1.username,
                    player2: match.player2.username,
                    player1Score: match.player1.score,
                    player2Score:  match.player2.score,
                    roundName : match.tournamentName,
                    gameStatus: match.gameStatus === 0 ?  'Not Started' : ( match.gameStatus === 1 ? 'On Going' : 'Over'),
                    winner: match.winner ? match.winner : 'TBD'

                })
            }
        }
        return report;
    }
}


module.exports = reportingService;