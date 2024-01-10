// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './config/firebase';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, []);

  const login = async (email, password) => {
    try {
      // Perform login with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
      // setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      // Perform signup with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // setLoggedIn(true);

      return userCredential.user;
    } catch (error) {
      console.log('Error signing up:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Perform logout with Firebase authentication
      await auth.signOut();
      // setLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
