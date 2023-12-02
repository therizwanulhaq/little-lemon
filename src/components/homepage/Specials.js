import React from "react";
import { css } from "@emotion/css";
import DishList from "./DishList";
import CustomButton from "../common/CustomButton";

import { Container, Title } from "./StyledComponents";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

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
          <CustomButton>Online Menu</CustomButton>
        </div>
        <Divider />
        <Link to="/order-delivery">
          <DishList />
        </Link>
      </Container>
    </>
  );
};

export default Specials;
