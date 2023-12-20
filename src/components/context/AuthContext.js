import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Spinner from "../common/Spinner";
import { collection, getDocs, query, where } from "@firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // If user is logged in, fetch user data
        fetchUserData(user);
      }
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

  const fetchUserData = async (user) => {
    if (user) {
      // Query the "users" collection to find the document with the matching email
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("uid", "==", user.uid));
      const userDocs = await getDocs(userQuery);

      if (userDocs.size > 0) {
        // Assume the first document (if multiple found) corresponds to the user
        const userDoc = userDocs.docs[0];
        setUserData(userDoc.data());
      } else {
        console.log("User data not found in FireStore");
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ user, userData, signIn, logOut, signUp }}>
      {!loading && children}
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
