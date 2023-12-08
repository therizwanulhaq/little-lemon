import React, { useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
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

const QuantityOfDishes = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    onQuantityChange((prevQuantity) => prevQuantity + 1); // Notify the parent component about the quantity change
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onQuantityChange((prevQuantity) => prevQuantity - 1); // Notify the parent component about the quantity change
    }
  };

  return (
    <>
      <Container>
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

export default QuantityOfDishes;
