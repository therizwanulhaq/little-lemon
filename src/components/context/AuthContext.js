import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "../common/Spinner";
import { doc, onSnapshot } from "@firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribeAuth;
    let unsubscribeSnapshot;

    const fetchUserData = async (uid) => {
      setLoading(true);
      const userDocRef = doc(db, "users", uid);

      unsubscribeSnapshot = onSnapshot(
        userDocRef,
        (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setUserData(data);
          }
          setLoading(false);
        },
        (error) => {
          setError(`Error getting real-time data: ${error.message}`);
          setLoading(false);
        }
      );
    };

    unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        fetchUserData(user.uid);
      }

      setLoading(false);
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error.message);
  }

  return (
    <AuthContext.Provider value={{ user, userData }}>
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
