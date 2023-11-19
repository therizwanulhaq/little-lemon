import { css } from "@emotion/css";
import React from "react";
import { NavLink } from "react-router-dom";

const navElements = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Reservations", path: "/reservations" },
  { name: "Order online", path: "/order-online" },
  { name: "Login", path: "/login" },
];

function Navbar() {
  return (
    <nav>
      <ul
        className={css`
          display: flex;
          gap: 2rem;
          align-items: center;
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
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
                // fontWeight: isActive ? "bold" : "",
                color: isActive ? "#ffd700" : "#333333",
              };
            }}
          >
            {navLink.name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
