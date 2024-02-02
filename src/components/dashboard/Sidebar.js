import React from "react";
import { useAuth } from "../context/AuthContext";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

import defaultProfilePicture from "../../assets/defaultProfilePicture.jpg";

const Aside = styled.aside`
  padding: 2rem;
  border-right: 1px solid #ccc;
  grid-area: sidebar;
  position: fixed;
  width: 20%;
  height: 100%;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ProfilePicture = styled.img`
  width: 2rem;
  height: 2rem;
  border: 1px solid #ccc;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileName = styled.p`
  font-weight: 700;
  font-size: 1.1rem;
`;

const SidebarNav = styled.ul`
  margin-top: 3rem;
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

const linkStyles = `
margin-bottom: 1rem;
display: flex;
align-items: center;
gap: 0.5rem;
padding: 0.4rem 1rem;
border-radius: 1rem;
cursor: pointer;
color: #1b2e35;
  text-decoration: none;

  :hover {
    background: #f4f4f4;
  }
   &.active {
    color: #c66218;
  }


  `;

const StyledNavlink = styled(NavLink)`
  ${linkStyles}
`;

const Sidebar = () => {
  const { userData } = useAuth();

  const sidebarMenu = [
    { icon: "overview", title: "Overview", path: "/dashboard/overview" },
    {
      icon: "receipt_long",
      title: "Reservations",
      path: "/dashboard/reservations",
    },
    {
      icon: "restaurant_menu",
      title: "Online Menu",
      path: "/dashboard/online-menu",
    },
  ];
  return (
    <Aside>
      <Profile>
        <ProfilePicture
          src={userData?.profilePicture || defaultProfilePicture}
          alt="user"
        />
        <ProfileName>{userData?.name}</ProfileName>
      </Profile>
      <SidebarNav>
        {sidebarMenu.map((sidebarNav) => (
          <StyledNavlink key={sidebarNav.title} to={sidebarNav.path}>
            <Icon className="material-symbols-outlined">{sidebarNav.icon}</Icon>
            <Title>{sidebarNav.title}</Title>
          </StyledNavlink>
        ))}
      </SidebarNav>
    </Aside>
  );
};

export default Sidebar;
