// SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth(); // Assuming your useAuth hook provides a signup function

  const handleSignUp = async () => {
    // Validation: Check if email and password are not empty
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?~`]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one lowercase letter, one uppercase letter, and one special character.');
      return;
    }

    try {
      // Sign up the user using the signup function from useAuth
      await signup(email, password);

      // Clear previous error message
      setError('');

      // Redirect to the login page
      navigate('/posts', { replace: true });

    } catch (error) {
      // Handle authentication errors
      setError('Sign-up failed. Please check your email and password.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#333' }}>Sign Up</h2>
      <form style={formStyle}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="button" onClick={handleSignUp} style={buttonStyle}>
          Sign Up
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

export default SignUpPage;
