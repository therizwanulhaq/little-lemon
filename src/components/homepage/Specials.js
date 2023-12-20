import React from "react";
import { css } from "@emotion/css";
import DishList from "./DishList";
import { CustomButton } from "../common/CustomButton";

import { Container, Title } from "./StyledComponents";

import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Divider = styled.div`
  display: none;
  width: 100%;
  background: #bfbfbf6b;
  height: 1px;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Specials = () => {
  return (
    <>
      <Container background="white" margin="3rem 0">
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          `}
        >
          <Title color="#333333" fontSize="3rem">
            This Weeks Specials!
          </Title>
          <Link to="/order-online">
            <CustomButton>Online Menu</CustomButton>
          </Link>
        </div>
        <Divider />
        <DishList />
      </Container>
    </>
  );
};

export default Specials;
