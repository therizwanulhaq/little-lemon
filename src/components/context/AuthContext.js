import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Spinner from "../common/Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, logOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
