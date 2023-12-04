import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
`;

const Quantity = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Button = styled.span`
  font-weight: 700;
  font-size: 1.3rem;
  cursor: pointer;
`;

const QuantityOfDishes = ({ quantity }) => {
  return (
    <>
      <Container>
        <Button className="material-symbols-outlined">remove</Button>
        <Quantity>{quantity}</Quantity>
        <Button className="material-symbols-outlined">add</Button>
      </Container>
    </>
  );
};

export default QuantityOfDishes;
