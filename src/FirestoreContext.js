// FirestoreContext.js
import React, { createContext, useContext } from 'react';
import { firestore } from './config/firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import User from './models/User'


const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
    const { setUser } = useAuth();

    // Function to add user information to Firestore
    const addUserToFirestore = async (uid, email, username) => {
        const usersRef = collection(firestore, 'users');

        // Add a new document with the user's UID as the document ID
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
                return postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            } else {
                console.error('No posts found for the user.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    };

    return (
        <FirestoreContext.Provider value={{ addUserToFirestore, initUser, addPostToFirestore, getPostsByUserId }}>
            {children}
        </FirestoreContext.Provider>
    );
};
export const useFirestore = () => {
    return useContext(FirestoreContext);
};
