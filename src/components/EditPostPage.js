// EditPostPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFirestore } from '../FirestoreContext';
import { useAuth } from '../AuthContext';

const EditPostPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { editPostInFirestore } = useFirestore();
    const { state: { post } } = useLocation();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title || '');
            setBody(post.body || '');
        }
    }, [post]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User not authenticated.');
            return;
        }

        try {
            if (post.postId) {
                await editPostInFirestore(post.postId, title, body);
                console.log('Post edited successfully!');
            } else {
                console.log("no such post");
            }
            setTitle('');
            setBody('');

            navigate('/posts', { replace: true });
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div style={containerStyle}>
            <h2>Edit Post</h2>
            <form style={formStyle} onSubmit={handleFormSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                />

                <label htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    name="body"
                    rows="4"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={inputStyle}
                />

                <button type="submit" style={buttonStyle}>
                    Submit
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
    width: '300px', // Set a specific width for the form
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

export default EditPostPage;
