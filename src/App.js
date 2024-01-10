
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PostsPage from './components/PostsPage';
import CreatePostPage from './components/CreatePostPage';
import EditPostPage from './components/EditPostPage';


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/edit-post/:postId" element={<EditPostPage />} />
      </Routes>
    </div>
  );
};

export default App;
