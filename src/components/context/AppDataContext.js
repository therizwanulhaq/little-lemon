import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase";

// Create a context for Dish and Reservation data
const AppDataContext = createContext();

// Provider component for managing Dish and Reservation data
function AppDataProvider({ children }) {
  const [dishData, setDishData] = useState([]);
  const [reservationTimes, setReservationTimes] = useState([]);

  useEffect(() => {
    // Fetch dish data from Firebase using onSnapshot
    const fetchDishData = async () => {
      try {
        const dishDataCollectionRef = collection(db, "dishData");
        const unsubscribe = onSnapshot(dishDataCollectionRef, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setDishData(data);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching dish data:", error);
      }
    };

    // Fetch reservation times from Firebase using onSnapshot
    const fetchReservationTimes = async () => {
      try {
        const reservationTimesCollectionRef = collection(
          db,
          "reservationTimes"
        );
        const unsubscribe = onSnapshot(
          reservationTimesCollectionRef,
          (snapshot) => {
            const times = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setReservationTimes(times);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching reservation times:", error);
      }
    };

    // Call both fetchData functions
    fetchDishData();
    fetchReservationTimes();
  }, []);

  // Provide the dishData and reservationTimes values to the context
  return (
    <AppDataContext.Provider value={{ dishData, reservationTimes }}>
      {children}
    </AppDataContext.Provider>
  );
}

// Custom hook for accessing Dish and Reservation context
function useAppDataContext() {
  return useContext(AppDataContext);
}

export { AppDataProvider, useAppDataContext };
