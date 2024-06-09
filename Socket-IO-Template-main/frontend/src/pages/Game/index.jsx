import React, { useState } from 'react';
import './Game.css';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement

// const API_BASE_URL = 'http://localhost:4000';
// const API_BASE_URL = 'http://172.20.10.2:4000';
const API_BASE_URL = `${process.env.REACT_APP_HOST}:4000`;


const Game = () => {
  const [gameDetails, setGameDetails] = useState(null);
  const [error, setError] = useState(null);
  const [matchOver, setMatchOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [me, setMe] = useState(jwtDecode(localStorage.getItem('pingPongToken')).username);
  const [showResultButton, setShowResultButton] = useState(false);
  const [matchScoreBoard, setMatchScoreBoard] = useState(null);
 
  const checkGameStatus = async () => {
    const token = localStorage.getItem('pingPongToken'); // Retrieve JWT from local storage
    const decodedToken = jwtDecode(token);
    // setMe(decodedToken.username);

    try {
      const response = await fetch(`${API_BASE_URL}/api/game/status/${decodedToken.username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        if(response.status === 202){
          console.log('GAMMMMEEEEE:',gameDetails);
          // setGameDetails(null);
          setShowResultButton(true);
          console.log('GAMMMMEEEEE:RRRR:data',gameDetails,showResultButton,data);
          // if(!showResultButton){
            
          // }
          alert( `${data.message}`);
        }else if(data.resp){
          setGameDetails(data.resp);
        }
        
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error checking game status:', error);
      setError('An error occurred while checking the game status.');
    }
  };

  const makeMove = async (matchId) => {
    const token = localStorage.getItem('pingPongToken'); // Retrieve JWT from local storage
    const decodedToken = jwtDecode(token);
    // Add logic for making a move
    // console.log('Make move clicked');
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/makeMove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({"username":decodedToken.username,"matchId":matchId}),
    });
    
      const data = await response.json();
      console.log(response,data,'--------------');
      if (response.ok) {
        setGameDetails(data.resp.tournamentDetails);
        setError(null);
        if (data.resp.message === "Match Over") {
          setMatchOver(true);
          if(!showResultButton){
            setShowResultButton(true);
          }
          
          setWinner(data.resp.tournamentDetails.winner);
        }
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while makeing move")
    }
  };

  const checkMatchFinalResult = async (matchId) => {

    const token = localStorage.getItem('pingPongToken'); // Retrieve JWT from local storage
    const decodedToken = jwtDecode(token);
    try {
      const response = await fetch(`${API_BASE_URL}/api/tournament/getMatchReport/${matchId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setMatchScoreBoard(data.report);
      }else{
        alert(data.error);
      }
      
    } catch (error) {
      alert(error);
      setError("An error occurred while makeing move");
    }
  }

  return (
    <div className="home-container">
      <h1 className="title">Game Page</h1>
      
      <div className="form">
        <button className="submit-button" onClick={checkGameStatus}>Check Game Status</button>
        {me && (<p className="form-group">ME: {me}</p>)}
        {gameDetails && (
          <div className="game-details">
            <p className="form-group">Tournament: {gameDetails.tournamentName}</p>
            
            <p className="form-group">Player 1: {gameDetails.player1.username} - Score: {gameDetails[gameDetails.player1.username].score}</p>
            <p className="form-group">Player 2: {gameDetails.player2.username} - Score: {gameDetails[gameDetails.player2.username].score}</p>
            <p className="form-group">Offensive Player: {gameDetails.offensivePlayer}</p>
            {gameDetails.gameStatus === 1 && (
              <button className="submit-button" onClick={() => makeMove(gameDetails.id)}>Make Move</button>
            )}
            {matchOver && (
              <div>
                {/* <button className="submit-button" onClick={() => checkMatchFinalResult(gameDetails.id)}>Check Game Result!?</button> */}
                <p className="form-group">Match Over! Winner: {winner}</p>
              </div>
              
            )}

            
          </div>
        )}
        {gameDetails && showResultButton && (
              <div className='game-details'>
                <button className="submit-button" onClick={() => checkMatchFinalResult(gameDetails.id)}>Check Game Result!""</button>
              </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      {matchScoreBoard && (
        <div className="results-table">
          <h2>Match Results</h2>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{matchScoreBoard.player1.username} </td>
                <td>{matchScoreBoard[matchScoreBoard.player1.username].score} </td>
                <td>{matchScoreBoard.player1.username===matchScoreBoard.winner ? 'won' : 'lost'} </td>
              </tr>
              <tr>
                <td>{matchScoreBoard.player2.username} </td>
                <td>{matchScoreBoard[matchScoreBoard.player2.username].score} </td>
                <td>{matchScoreBoard.player2.username===matchScoreBoard.winner ? 'won' : 'lost'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Game;
