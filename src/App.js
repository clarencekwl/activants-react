// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PostsPage from './components/PostsPage';
import Header from './components/Header';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/posts" element={<PostsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
