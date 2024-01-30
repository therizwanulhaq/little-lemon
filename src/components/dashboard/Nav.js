import styled from "@emotion/styled";
import React from "react";

const StyledSection = styled.section`
  border-bottom: 1px solid #ccc;
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  grid-area: nav;
`;

const Nav = () => {
  return (
    <StyledSection>
      <b>
        <p>Little Lemon Dashboard</p>
      </b>
    </StyledSection>
  );
};

export default Nav;
