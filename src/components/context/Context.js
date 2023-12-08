import React, { createContext, useState, useContext, useEffect } from "react";
import dishListData from "./dishData.json";

const DishContext = createContext();

function DishListProvider({ children }) {
  const [dishList, setDishList] = useState([]);

  useEffect(() => {
    setDishList(dishListData);
  }, []);

  return (
    <DishContext.Provider value={dishList}>{children}</DishContext.Provider>
  );
}

function useDishContext() {
  return useContext(DishContext);
}

export { DishListProvider, useDishContext };
