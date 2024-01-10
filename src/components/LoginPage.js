import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import { useFirestore } from '../providers/FirestoreContext';
import '../styles/AuthStyle.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate();
  const { login } = useAuth();
  const { initUser } = useFirestore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    try {
      setSubmitting(true);
      const user = await login(email, password);
      console.log("user id after login: ", user.uid);
      await initUser(user.uid);
      setError('');

      navigate('/posts', { replace: true });

    } catch (error) {
      setError('Authentication failed. Please check your email and password.');
      console.error('Error signing in:', error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="container">
      <h2 style={{ color: '#333' }}>Login Page</h2>
      <form className="form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="button" disabled={submitting} onClick={handleLogin} className="button">
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
