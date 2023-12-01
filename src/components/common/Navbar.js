import styled from "@emotion/styled";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LittleLemon from "../../assets/Asset20@4x.png";

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

const DesktopNavLink = styled(NavLink)`
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
  &.active {
    color: #ffd700;
  }
`;

const MobileNavBar = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  background-color: #eee;
  padding-top: 0.3rem;
  border-left: 1px solid #50645e36;
  width: 60%;
  height: 100%;
  text-align: left;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 260ms;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #333333;
  padding: 1rem 2rem;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid #50645e36;

  &:hover {
    background-color: #fdfdfd;
  }

  &:first-child {
    border-top: 1px solid #50645e36;
    margin-top: 3rem;
  }

  &.active {
    color: #558b7b;
    background: #50645e36;
    border-top: 1px solid #50645e36;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
`;

const Logo = styled.img`
  width: 5rem;
  margin: auto;
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
          <DesktopNavLink to={navLink.path} key={index}>
            {navLink.name}
          </DesktopNavLink>
        ))}
      </DesktopNavBar>
      <HamburgerMenu
        className="material-symbols-outlined"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
      >
        {isMobileMenuOpen ? "close" : "menu"}
      </HamburgerMenu>

      <MobileNavBar isOpen={isMobileMenuOpen}>
        {navElements.map((navLink, index) => (
          <MobileNavLink
            to={navLink.path}
            key={index}
            onClick={toggleMobileMenu}
          >
            {navLink.name}
          </MobileNavLink>
        ))}
        <Logo src={LittleLemon} />
      </MobileNavBar>
      {isMobileMenuOpen && <Overlay onClick={toggleMobileMenu} />}
    </nav>
  );
}

export default Navbar;
