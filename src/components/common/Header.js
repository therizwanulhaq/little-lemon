import React from "react";
import { css } from "@emotion/css";
import logo from "../../assets/Logo.png";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const StyledHeader = styled.header`
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem 15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq[3]} {
    padding: 1rem 10rem;
  }
  ${mq[2]} {
    padding: 1rem 5rem;
  }
  ${mq[1]} {
    padding: 0.5rem 2rem;
    border-bottom: 1px solid #ccc;
  }
  ${mq[0]} {
    padding: 0.5rem 1rem;
  }
`;

function Header() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.includes("/dashboard");
  return (
    !isDashboardRoute && (
      <StyledHeader>
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
      </StyledHeader>
    )
  );
}

export default Header;
