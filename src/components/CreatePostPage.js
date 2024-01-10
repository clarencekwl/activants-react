import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../providers/FirestoreContext';
import { useAuth } from '../providers/AuthContext';
import '../styles/PostFormStyle.css';

const CreatePostPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addPostToFirestore } = useFirestore();
    const [submitting, setSubmitting] = useState(false)
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User not authenticated.');
            return;
        }

        try {
            setSubmitting(true);
            await addPostToFirestore(user.id, title, body);

            setTitle('');
            setBody('');

            console.log('Post added successfully!');
            navigate('/posts', { replace: true });
        } catch (error) {
            console.error('Error adding post to Firestore:', error);
        } finally {
            setSubmitting(false);
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

                <button type="submit" disabled={submitting} className="button">
                    Submit
                </button>
            </form>
        </div>
    );
};


export default CreatePostPage;
