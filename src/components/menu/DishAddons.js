import React from "react";
import styled from "@emotion/styled";

const AddonsContainer = styled.div`
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

const DishAddons = ({ name, price, quantity }) => {
  return (
    <>
      <AddonsContainer>
        <Name>
          {name} x{quantity}
        </Name>
        <Cta>
          <Button className="material-symbols-outlined">remove</Button>
          <Price>${price}</Price>
          <Button className="material-symbols-outlined">add</Button>
        </Cta>
      </AddonsContainer>
      <Divider />
    </>
  );
};

export default DishAddons;
