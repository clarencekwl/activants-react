import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header style={headerStyle}>
      <div>
        <Link to={user ? '/posts' : '/'}>
          <h1>Company B</h1>
        </Link>
      </div>
      <div style={userSectionStyle}>
        {user ? (
          <>
            <p style={welcomeTextStyle}>Welcome, {user.username}</p>
            <button onClick={handleLogout} style={signOutButtonStyle}>
              Sign Out
            </button>
          </>
        ) : (
          <Link to={location.pathname === '/login' ? '/' : '/login'}>
            <p style={textStyle}>{location.pathname === '/login' ? 'Sign Up' : 'Login'} </p>
          </Link>
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

const textStyle = {
  fontSize: '1.5rem',
}

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
