import React from "react";
import { Main } from "./StyledComponents";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import DashboardUrls from "./DashboardUrls";

const Dashboard = () => {
  return (
    <Main>
      <Sidebar />
      <Nav />
      <DashboardUrls />
    </Main>
  );
};

export default Dashboard;
