// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    // Validation: Check if username and password are not empty
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    // Clear previous error message
    setError('');

    // Perform authentication here (e.g., send credentials to a server)
    // For simplicity, this example does not include real authentication logic.

    // Log in the user
    login(username);

    // Redirect to the posts page
    navigate('/posts');
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#333' }}>Login Page</h2>
      <form style={formStyle}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="button" onClick={handleLogin} style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};


const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center horizontally
  justifyContent: 'center', // Center vertically
  height: '100vh', // Use full viewport height
  marginTop: '-50px', // Adjust the top margin to move the form higher up
};

const formStyle = {
  background: '#f0f0f0', // Set background color
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
};

const inputStyle = {
  marginBottom: '10px',
  padding: '8px',
  width: '100%',
  boxSizing: 'border-box',
};

const buttonStyle = {
  background: '#333', // Set background color
  color: '#fff', // Set text color
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%', // Make the button full width
};

export default LoginPage;
