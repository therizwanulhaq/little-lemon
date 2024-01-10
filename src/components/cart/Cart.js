import React from "react";
import {
  Main,
  Container,
  TitleAndPrice,
  Title,
  Price,
} from "./StyledComponents";
import { css } from "@emotion/css";

const Cart = () => {
  return (
    <Main>
      <div
        className={css`
          display: flex;
          gap: 1rem;
        `}
      >
        <Container>
          <TitleAndPrice>
            <Title>Shopping Cart</Title>
            <Price>Price</Price>
          </TitleAndPrice>
          <div
            className={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <img src="" alt="Dish"></img>
            <div>
              <p>Dish Name</p>
              <p>Price</p>
              <p>Quantity</p>
            </div>
            <p>Price</p>
          </div>
        </Container>
        <Container>
          <p>Subtotal (2 items) : $231.00</p>
          <button>Proceed to Buy</button>
        </Container>
      </div>
    </Main>
  );
};

export default Cart;
