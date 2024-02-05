import styled from "@emotion/styled";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AddNewDish from "./online_menu/AddNewDish";
import DishListPage from "./online_menu/DishListPage";
import EditDishPage from "./online_menu/EditDishPage";
import Overview from "./overview/Overview";
import ReservationTimes from "./reservation_times/ReservationTimes";
import Orders from "./orders/Orders";
import Reservations from "./reservations/Reservations";

const Section = styled.section`
  grid-area: dashboardUrls;
  padding: 2rem;
`;

const DashboardUrls = () => {
  return (
    <Section>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="online-menu" element={<DishListPage />} />
        <Route path="online-menu/add-new-dish" element={<AddNewDish />} />
        <Route path="edit-dish/:id" element={<EditDishPage />} />
        <Route path="reservation-times" element={<ReservationTimes />} />
      </Routes>
    </Section>
  );
};

export default DashboardUrls;
