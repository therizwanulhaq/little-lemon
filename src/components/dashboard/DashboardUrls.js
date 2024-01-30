import styled from "@emotion/styled";
import React from "react";
import { Route, Routes } from "react-router-dom";
import DishListPage from "./DishListPage";
import EditDishPage from "./EditDishPage";
import AddNewDish from "./AddNewDish";

const Section = styled.section`
  grid-area: dashboardUrls;
  padding: 2rem;
`;

const DashboardUrls = () => {
  return (
    <Section>
      <Routes>
        <Route path="online-menu" element={<DishListPage />} />
        <Route path="online-menu/add-new-dish/" element={<AddNewDish />} />
        <Route path="edit-dish/:id" element={<EditDishPage />} />
      </Routes>
    </Section>
  );
};

export default DashboardUrls;
