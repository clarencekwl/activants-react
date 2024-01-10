// CreatePostPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../FirestoreContext';
import { useAuth } from '../AuthContext';
import '../styles/PostFormStyle.css';

const CreatePostPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addPostToFirestore } = useFirestore();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User not authenticated.');
            return;
        }

        try {
            await addPostToFirestore(user.id, title, body);

            // Reset the form after successfully adding a post
            setTitle('');
            setBody('');

            console.log('Post added successfully!');
            navigate('/posts', { replace: true });
        } catch (error) {
            console.error('Error adding post to Firestore:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Post</h2>
            <form className="form" onSubmit={handleFormSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                />

                <label htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    name="body"
                    rows="4"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="input"
                />

                <button type="submit" className="button">
                    Submit
                </button>
            </form>
        </div>
    );
};


export default CreatePostPage;
