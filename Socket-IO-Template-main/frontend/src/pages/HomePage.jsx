import React, { useState } from 'react';
import { login } from '../services/apiService';
import './HomePage.css'; // Import the CSS file
import {jwtDecode} from 'jwt-decode';
// require("dotenv").config();

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (!username || !password) {
            setError('Both fields are required.');
            setLoading(false);
            return;
        }

        try {
            const data = await login({ username, password });
            console.log('Success:', data);
            if (data.token) {
                localStorage.setItem('pingPongToken', data.token)
                const decodedToken = jwtDecode(data.token);
                if (decodedToken.role === 'admin') {
                    // window.location.href = "http://localhost:3000/Admin"
                    console.log(process.env.REACT_APP_HOST);
                    window.location.href = `${process.env.REACT_APP_HOST}:3000/Admin`;

                    // history.push('/admin');
                } else {
                    // history.push('/game');
                    // window.location.href = "http://localhost:3000/Game"
                    window.location.href = `${process.env.REACT_APP_HOST}:3000/Game`;
                }
            }
            // Handle successful response, e.g., redirect or update UI
            // window.location.href = "http://localhost:3000/Game"
        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <h1 className="title">Join Now!!</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Home;
