// PostsPage.js
import React, { useEffect, useState } from 'react';
import { useFirestore } from '../FirestoreContext';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const PostsPage = () => {
  const { user } = useAuth();
  const { getPostsByUserId } = useFirestore();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {

    const fetchUserPosts = async () => {
      if (user) {

        const posts = await getPostsByUserId(user.id);
        setUserPosts(posts);
      }
    };

    fetchUserPosts();
  }, [user, getPostsByUserId]);

  const containerStyle = {
    padding: '50px',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: 'purple',
    color: 'white',
    padding: '15px',
    borderRadius: '10px',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    cursor: 'pointer',
  }

  return (
    <div style={containerStyle}>
      <h2>Posts Page</h2>
      {userPosts.map((post) => (
        <div key={post.id} style={cardStyle}>
          <h3>Title: {post.title}</h3>
          <p>Body: {post.body}</p>
        </div>
      ))}
      <Link to="/create-post">
        <button
          style={buttonStyle}
        >
          Create Post
        </button>
      </Link>
    </div>
  );
};

export default PostsPage;
