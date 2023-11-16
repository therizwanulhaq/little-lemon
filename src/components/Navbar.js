import { css } from "@emotion/css";
import React from "react";
const navElements = [
  "Home",
  "About",
  "Menu",
  "Reservations",
  "Order online",
  "Login",
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
          <li
            key={index}
            className={css`
              font-size: 0.9rem;
              font-weight: 600;
              color: #333333;
            `}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
