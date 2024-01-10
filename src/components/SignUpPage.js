
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import { useFirestore } from '../providers/FirestoreContext';
import '../styles/AuthStyle.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { addUserToFirestore } = useFirestore();

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?~`]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one lowercase letter, one uppercase letter, and one special character.');
      return;
    }

    try {
      setSubmitting(true);
      const user = await signup(email, password);

      await addUserToFirestore(user.uid, email, username);

      setError('');

      navigate('/posts', { replace: true });

    } catch (error) {
      setError('Sign-up failed. Please check your email and password.');
      console.error('Error signing up:', error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="container">
      <h2 style={{ color: '#333' }}>Sign Up</h2>
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
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="button" disabled={submitting} onClick={handleSignUp} className="button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
