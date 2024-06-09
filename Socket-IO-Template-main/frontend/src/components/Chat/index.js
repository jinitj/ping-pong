import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// const socket = io('http://localhost:4000');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // socket.on('message', (message) => {
        //     setMessages((prevMessages) => [...prevMessages, message]);
        // });

        // return () => {
        //     socket.off('message');
        // };
    }, []);

    const sendMessage = () => {
        // if (message) {
        //     socket.emit('newJoinee', message);
        //     setMessage('');
        // }
    };

    return (
        <div>
            <h1>Play</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
