// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic (clear session, etc.)
    logout();

    // Redirect to the login page
    navigate('/');
  };

  return (
    <header style={headerStyle}>
      <div>
        <Link to={user ? '/posts' : '/'}> {/* Conditional link based on user's authentication status */}
          <h1>Company B</h1>
        </Link>
      </div>
      <div style={userSectionStyle}>
        {user ? (
          <p style={welcomeTextStyle}>Welcome, {user.username}</p>
        ) : (
            <h2>Login</h2>
        )}
        {user && (
          <button onClick={handleLogout} style={signOutButtonStyle}>
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem',
  backgroundColor: '#eee',
};

const userSectionStyle = {
  display: 'flex',
  alignItems: 'center',
};

const welcomeTextStyle = {
  marginRight: '20px',
  fontSize: '1.5rem',
  textAlign: 'center',
};

const signOutButtonStyle = {
  fontSize: '1rem',
  padding: '8px 16px',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
};

export default Header;
