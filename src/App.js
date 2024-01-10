// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PostsPage from './components/PostsPage';
import CreatePostPage from './components/CreatePostPage';


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
      </Routes>
    </div>
  );
};

export default App;
