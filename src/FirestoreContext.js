// FirestoreContext.js
import React, { createContext, useContext } from 'react';
import { firestore } from './config/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';


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

        // After updating Firestore, update the user in AuthContext
        setUser({
            uid: uid,
            email: email,
            username: username,
        });
    };

    const getUser = async (uid) => {
        const usersRef = collection(firestore, 'users');
        const userDoc = doc(usersRef, uid);

        try {
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();

                // Set the user in AuthContext
                setUser({
                    uid: uid,
                    email: userData.email,
                    username: userData.username,
                });

            } else {
                console.error('User not found in Firestore.');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    };

    return (
        <FirestoreContext.Provider value={{ addUserToFirestore, getUser }}>
            {children}
        </FirestoreContext.Provider>
    );
};

export const useFirestore = () => {
    return useContext(FirestoreContext);
};
