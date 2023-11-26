import React from "react";
import { css } from "@emotion/css";
import DishList from "./DishList";
import CustomButton from "../common/CustomButton";

import { Container, Title } from "./StyledComponents";

const Specials = () => {
  return (
    <>
      <Container background="white" margin="5rem 0">
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
        <DishList />
      </Container>
    </>
  );
};

export default Specials;
