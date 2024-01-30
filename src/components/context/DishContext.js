import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase";

// Create a context for Dish data
const DishContext = createContext();

// Provider component for managing Dish data
function DishDataProvider({ children }) {
  const [dishData, setDishData] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase using onSnapshot
    const fetchData = async () => {
      try {
        const dishDataCollectionRef = collection(db, "dishData");
        const unsubscribe = onSnapshot(dishDataCollectionRef, (snapshot) => {
          // Map the snapshot data to an array of objects
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Update the state with the fetched data
          setDishData(data);
        });

        // Clean up the subscription on component unmount
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching dish data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  // Provide the dishData value to the context
  return (
    <DishContext.Provider value={dishData}>{children}</DishContext.Provider>
  );
}

// Custom hook for accessing Dish context
function useDishContext() {
  return useContext(DishContext);
}

export { DishDataProvider, useDishContext };
