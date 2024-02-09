import React, { useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.5rem;
  align-items: center;
  user-select: none;
  width: 9rem;
  color: #0f1111;
`;

const Quantity = styled.h2`
  font-size: 1rem;
  font-weight: 700;
`;

const Button = styled.span`
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
`;

const DishQuantity = ({ existingQuantity }) => {
  const [quantity, setQuantity] = useState(existingQuantity);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <Container>
        <Quantity>Quantity: </Quantity>
        <Button
          className="material-symbols-outlined"
          onClick={decrementQuantity}
        >
          remove
        </Button>
        <Quantity>{quantity}</Quantity>
        <Button
          className="material-symbols-outlined"
          onClick={incrementQuantity}
        >
          add
        </Button>
      </Container>
    </>
  );
};

export default DishQuantity;
