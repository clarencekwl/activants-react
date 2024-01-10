
import React, { createContext, useContext } from 'react';
import { firestore } from '../config/firebase';
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import User from '../models/User'
import Post from '../models/Post'

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
    const { setUser } = useAuth();

    const addUserToFirestore = async (uid, email, username) => {
        const usersRef = collection(firestore, 'users');

        const userDoc = doc(usersRef, uid);
        await setDoc(userDoc, {
            email: email,
            username: username,
        });

        setUser(new User(uid, username, email));

    };

    const initUser = async (uid) => {
        const usersRef = collection(firestore, 'users');
        const userDoc = doc(usersRef, uid);

        try {
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();

                setUser(new User(uid, userData.username, userData.email));

            } else {
                console.error('User not found in Firestore.');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    };


    const addPostToFirestore = async (userId, title, body) => {
        const postsRef = collection(firestore, 'posts');
        await setDoc(doc(postsRef), {
            userId: userId,
            title: title,
            body: body,
        });
    };

    const getPostsByUserId = async (userId) => {
        const postsRef = collection(firestore, 'posts');
        const q = query(postsRef, where('userId', '==', userId));

        try {
            const postsSnapshot = await getDocs(q);

            if (!postsSnapshot.empty) {
                return postsSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return new Post(doc.id, data.userId, data.title, data.body);
                });
            } else {
                console.log('No posts found for the user.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    };

    const deletePost = async (postId) => {
        const postRef = doc(collection(firestore, 'posts'), postId);
        await deleteDoc(postRef);
    };

    const editPostInFirestore = async (postId, title, body) => {
        const postRef = doc(collection(firestore, 'posts'), postId);

        try {
            await setDoc(postRef, {
                title: title,
                body: body,
            }, { merge: true });
        } catch (error) {
            console.error('Error editing post:', error);
            throw error;
        }
    };

    return (
        <FirestoreContext.Provider value={{ addUserToFirestore, initUser, addPostToFirestore, getPostsByUserId, deletePost, editPostInFirestore }}>
            {children}
        </FirestoreContext.Provider>
    );
};
export const useFirestore = () => {
    return useContext(FirestoreContext);
};
