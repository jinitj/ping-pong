import React, { useState } from 'react';
import Modal from '../Modal';
import './Admin.css';

// const API_BASE_URL = 'http://localhost:4000';
// const API_BASE_URL = 'http://172.20.10.2:4000';
const API_BASE_URL = `${process.env.REACT_APP_HOST}:4000`;


const Admin = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [matches, setMatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState(null);


  const fetchPlayerCount = async () => {
    const token = localStorage.getItem('pingPongToken')
    try {
      const response = await fetch(`${API_BASE_URL}/api/players/count`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setPlayerCount(data.joined);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error fetching player count:', error);
    }
  };

  const startTournament = async () => {
    const token = localStorage.getItem('pingPongToken')
    try {
      const response = await fetch(`${API_BASE_URL}/api/tournament/start`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        const numMatches = Math.floor(playerCount / 2);

        const generatedMatches = Object.keys(data).map(matchId => {
          const match = data[matchId];
          return {
            matchId: matchId,
            offensivePlayer: match.offensivePlayer,
            offensiveScore: match.player1.score,
            defensivePlayer: match.player2.username,
            defensiveScore: match.player2.score,
            tournamentName: match.tournamentName,
            winner: null
          };
        });
        setMatches(generatedMatches);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error starting tournament:', error);
    }
  };

  const handleStartMatch = async (matchId) => {
    const token = localStorage.getItem('pingPongToken')
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/start/${matchId}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setPlayerCount(data.joined);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error fetching player count:', error);
    }
    // Implement the logic to start the match
    console.log(`Start match: ${matchId}`);
  };

  const handleCheckLiveStatus = async (matchId) => {
    // Implement the logic to check the live status of the match
    console.log(`Check live status: ${matchId}`);
    console.log(matches);
    const token = localStorage.getItem('pingPongToken'); // Retrieve JWT from local storage
    // const decodedToken = jwtDecode(token);

    try {
      const response = await fetch(`${API_BASE_URL}/api/game/checkLiveStatus/${matchId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMatches(prevMatches => {
          return prevMatches.map(match => {
            if (match.matchId === matchId) {
              return {
                ...match,
                offensivePlayer: data.resp.offensivePlayer,
                defensivePlayer: data.resp.defensivePlayer,
                offensiveScore: data.resp[data.resp.offensivePlayer].score,
                defensiveScore: data.resp[data.resp.defensivePlayer].score,
                winner : data.resp.winner ?? null
              };
            }
            return match;
          });
        });
      }else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error checking game status:', error);
    }
  };

  const handleEndMatch = (matchId) => {
    console.log(`End match: ${matchId}`);
  };

  const generateReport = async () => {
    const token = localStorage.getItem('pingPongToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/tournament/getFinalReport`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if(response.ok){
        console.log('reportttttData',data);
        setReportContent(data.report);
        setIsModalOpen(true);
      }else{
        alert(data.error);
      }
    } catch (error) {
      console.error('Error generating final report:', error);
    }
    
  }

  return (
    <div className="admin-container">
      <h1 className="title">Admin Page</h1>
      <div className="form">
        <button className="submit-button" onClick={fetchPlayerCount}>Check Players Joined</button>
        {playerCount !== 0 && <p className="form-group">Players Joined: {playerCount}</p>}
        <div className='form'>
        <button className="submit-button" onClick={startTournament}>Start Tournament</button>
        <button className="submit-button" onClick={generateReport}>Get Report</button>

        </div>
        {matches.length > 0 && (
          <div className="matches">
            {matches.map((match, index) => (
              <div className="card" key={index}>
                <h3>Match {index + 1}</h3>
                <p>Offensive Player: {match.offensivePlayer} - Score: {match.offensiveScore}</p>
                <p>Defensive Player: {match.defensivePlayer} - Score: {match.defensiveScore}</p>
                {match.winner && (<p>Winner: {match.winner}</p>)}
                <button className="match-button" onClick={() => handleStartMatch(match.matchId)}>Start Match</button>
                <button className="match-button" onClick={() => handleCheckLiveStatus(match.matchId)}>Check Live Status</button>
                <button className="match-button" onClick={() => handleEndMatch(match.matchId)}>End Match</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={reportContent}
      />
    </div>
  );
};

export default Admin;
