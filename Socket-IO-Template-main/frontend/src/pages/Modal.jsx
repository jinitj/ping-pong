import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Player 1 Score</th>
              <th>Player 2 Score</th>
              <th>Round Name</th>
              <th>Game Status</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {content.map((match, index) => (
              <tr key={index}>
                <td>{match.player1}</td>
                <td>{match.player2}</td>
                <td>{match.player1Score}</td>
                <td>{match.player2Score}</td>
                <td>{match.roundName}</td>
                <td>{match.gameStatus}</td>
                <td>{match.winner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
