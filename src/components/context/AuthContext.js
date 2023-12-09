import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error);
      setIsLoggedIn(false);
      if (error.code === "auth/invalid-credential") {
        throw new Error("Incorrect email or password");
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
    setIsLoggedIn(false);
  };

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password, isLoggedIn);
    } catch (error) {
      console.error("Error signing up:", error);
      console.error("Error code:", error.code);
      if (error.code === "auth/email-already-in-use") {
        throw new Error(
          "This email is already registered. Please use another email."
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, logout, signUp }}>
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
