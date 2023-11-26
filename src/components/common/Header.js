import React from "react";
import { css } from "@emotion/css";
import logo from "../../assets/Logo.png";
import Navbar from "../homepage/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      className={css`
        margin: 1rem 15rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 768px) {
          margin: 0.5rem 2rem; // Adjust padding for smaller screens
        }
      `}
    >
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className={css`
            width: 10rem;
          `}
        />
      </Link>
      <Navbar />
    </header>
  );
}

export default Header;
