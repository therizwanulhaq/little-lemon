import React, { useState } from "react";
import styled from "@emotion/styled";

const DishModifiersContainer = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
`;

const Cta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Price = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
`;

const Divider = styled.div((props) => ({
  width: " 100%",
  background: props.background || "#bfbfbf9b",
  height: props.height || " 1px",
  marginBottom: props.marginBottom || "1rem",
}));

const Button = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
`;

const DishAddons = ({ name, price, onTotalPriceChange }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    onTotalPriceChange((prevTotal) => prevTotal + parseFloat(price)); // Notify the parent component about the total price change
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onTotalPriceChange((prevTotal) => prevTotal - parseFloat(price)); // Notify the parent component about the total price change
    }
  };

  // Calculate total price based on quantity
  const total = (quantity * parseFloat(price)).toFixed(2);

  return (
    <>
      <DishModifiersContainer>
        <Name>
          {name} x{quantity}
        </Name>
        <Cta>
          <Button
            className="material-symbols-outlined"
            onClick={decrementQuantity}
          >
            remove
          </Button>
          <Price>${total}</Price>
          <Button
            className="material-symbols-outlined"
            onClick={incrementQuantity}
          >
            add
          </Button>
        </Cta>
      </DishModifiersContainer>
      <Divider />
    </>
  );
};

export default DishAddons;
