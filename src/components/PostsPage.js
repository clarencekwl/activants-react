import React, { useEffect, useState } from 'react';
import { useFirestore } from '../providers/FirestoreContext';
import { useAuth } from '../providers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const PostsPage = () => {
  const { user } = useAuth();
  const { getPostsByUserId, deletePost } = useFirestore();
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {

    const fetchUserPosts = async () => {
      if (user) {
        const posts = await getPostsByUserId(user.id);
        setUserPosts(posts);
      }
    };

    fetchUserPosts();
  }, [user, getPostsByUserId]);



  const handleEdit = (post) => {

    navigate(`/edit-post/${post.postId}`, { state: { post } });
  };

  const handleDelete = async (postId) => {
    try {

      await deletePost(postId);

      const updatedPosts = await getPostsByUserId(user.id);
      setUserPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Posts Page</h2>
      {userPosts.map((post) => (
        <div key={post.postId} style={cardStyle}>
          <div>
            <h3>Title: {post.title}</h3>
            <p>Body: {post.body}</p>
          </div>
          <div>
            <button style={editButtonStyle} onClick={() => handleEdit(post)}>
              Edit
            </button>
            <button style={deleteButtonStyle} onClick={() => handleDelete(post.postId)}>
              Delete
            </button>
          </div>
        </div>
      ))}
      <Link to="/create-post">
        <button style={buttonStyle}>Create Post</button>
      </Link>
    </div>
  );


};
const containerStyle = {
  padding: '50px',
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
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
};

const deleteButtonStyle = {
  backgroundColor: '#ff6666',
  color: '#fff',
  padding: '8px',
  borderRadius: '5px',
  cursor: 'pointer',
};




const editButtonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '8px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

export default PostsPage;
