import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navElements = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Reservations", path: "/reservations" },
  { name: "Order online", path: "/order-online" },
  { name: "Login", path: "/login" },
];

const HamburgerMenu = styled.span`
  cursor: pointer;
  position: absolute;
  z-index: 6;
  top: 1.1rem;
  right: 2rem;
  @media (min-width: 769px) {
    display: none;
  }
`;

const DesktopNavBar = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNavBar = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding-top: 0.3rem;
  border-left: 1px solid #eee;
  width: 60%;
  height: 100%;
  text-align: left;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 260ms;
`;

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <DesktopNavBar>
        {navElements.map((navLink, index) => (
          <NavLink
            to={navLink.path}
            key={index}
            className={css`
              font-size: 0.9rem;
              font-weight: 600;
              color: #333333;
              position: relative;
              text-decoration: none;

              &:hover::before {
                width: 100%;
              }

              &::before {
                content: "";
                position: absolute;
                width: 0;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: #ffd700;
                visibility: visible;
                transition: width 0.3s ease-in-out;
              }

              &:hover {
                color: #ffd700;
                transition: color 0.3s ease-in-out;
              }
            `}
            style={({ isActive }) => {
              return {
                color: isActive ? "#ffd700" : "#333333",
              };
            }}
          >
            {navLink.name}
          </NavLink>
        ))}
      </DesktopNavBar>
      <HamburgerMenu
        className="material-symbols-outlined"
        onClick={toggleMobileMenu}
        isOpen={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
      >
        {isMobileMenuOpen ? "close" : "menu"}
      </HamburgerMenu>

      <MobileNavBar isOpen={isMobileMenuOpen}>
        {navElements.map((navLink, index) => (
          <NavLink
            to={navLink.path}
            key={index}
            onClick={toggleMobileMenu}
            className={css`
              font-size: 0.9rem;
              font-weight: 600;
              text-transform: uppercase;
              color: #333333;
              padding: 1rem 2rem;
              text-decoration: none;
              cursor: pointer;
              border-bottom: 1px solid #eee;

              &:hover {
                background-color: #fdfdfd;
              }

              &:first-child {
                padding-top: 3rem; /* Adjust the top padding as needed */
              }
            `}
            style={({ isActive }) => {
              return {
                color: isActive ? "#ffd700" : "#333333",
              };
            }}
          >
            {navLink.name}
          </NavLink>
        ))}
      </MobileNavBar>
    </nav>
  );
}

export default Navbar;
