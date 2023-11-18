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
        {navElements.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={css`
              font-size: 0.9rem;
              font-weight: 600;
              color: #333333;
            `}
          >
            {item.name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
