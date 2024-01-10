import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {

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
