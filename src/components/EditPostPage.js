import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFirestore } from '../providers/FirestoreContext';
import { useAuth } from '../providers/AuthContext';

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
        <div className="container">
            <h2>Edit Post</h2>
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

export default EditPostPage;
