import React, { useState } from "react";
import styled from "@emotion/styled";

import { CtaButton } from "../common/CustomButton";
import DishModifiers from "./DishModifiers";
import QuantityOfDishes from "./QuantityOfDishes";
import { useParams } from "react-router-dom";
import { useDishContext } from "../context/Context";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const Section = styled.section`
  padding: 0 15rem;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(2, 1fr);

  ${mq[3]} {
    padding: 0 10rem;
  }
  ${mq[2]} {
    padding: 0 5rem;
  }

  ${mq[1]} {
    padding: 0;
    gap: 0;
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  ${mq[1]} {
    padding: 0 2rem;
  }
  ${mq[0]} {
    padding: 0 1rem;
  }
`;
const DishImage = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  ${mq[1]} {
    border-radius: 0;
  }
  ${mq[0]} {
    height: 13rem;
  }
`;

const DishDetailsContainer = styled.div`
  ${mq[1]} {
    padding: 0 2rem;
  }
  ${mq[0]} {
    padding: 0 1rem;
  }
`;

const DishName = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
`;

const DishPrice = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  /* color: #cd690c; */
`;

const PriceAndDishRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const DishDescription = styled.p`
  margin: 1rem 0 1.5rem 0;
  font-size: 0.95rem;
`;

const Cta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 1rem;
`;

const DeliveryIcon = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const DeliveryTime = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

const Divider = styled.div`
  margin: 1rem 0;
  display: none;
  background: #bfbfbfc2;
  height: 2px;
  ${mq[1]} {
    display: block;
  }
`;
const Title = styled.h2`
  margin-top: ${(props) => props.marginTop || "0"};
  margin-bottom: 1rem;
`;

const addons = [
  { id: 1, name: "Avocado", price: "1" },
  { id: 2, name: "Seeds", price: "1" },
  { id: 3, name: "Dressing", price: "1" },
];

const toSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

const OrderDelivery = () => {
  const { dishName } = useParams();
  const dishList = useDishContext();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Calculate the initial total price based on addon prices
  const initialTotalPrice = addons.reduce(
    (total, addon) => total + parseFloat(addon.price),
    0
  );

  const [selectedTotalPrice, setSelectedTotalPrice] =
    useState(initialTotalPrice);

  // Find the dish with the matching dishName
  const selectedDish = dishList.find((dish) => toSlug(dish.name) === dishName);

  if (!selectedDish) {
    return <div>Dish not found</div>; // Handle the case where the dish is not found
  }

  const { image, name, price, description } = selectedDish;

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  // Handle total price change from DishAddons
  const handleTotalPriceChange = (newTotalPrice) => {
    setSelectedTotalPrice(newTotalPrice);
  };

  // Calculate the total price based on quantity and add the total price from DishAddons
  const totalPrice = (
    selectedQuantity * parseFloat(price) +
    selectedTotalPrice
  ).toFixed(2);

  return (
    <Section>
      <div>
        <DishImage src={image} alt={name} />
        <DishDetailsContainer>
          <PriceAndDishRow>
            <DishName>{name}</DishName>
            <DishPrice>${price}</DishPrice>
          </PriceAndDishRow>
          <DishDescription>{description}</DishDescription>
          <Cta>
            <DeliveryIcon className="material-symbols-outlined">
              directions_bike
            </DeliveryIcon>
            Delivery Time:
            <DeliveryTime>30 minutes</DeliveryTime>
          </Cta>
          <Divider />
        </DishDetailsContainer>
      </div>
      <Container>
        <Title>Add</Title>
        {addons.map(({ id, name, price }) => (
          <DishModifiers
            key={id}
            name={name}
            price={price}
            onTotalPriceChange={handleTotalPriceChange}
          />
        ))}
        <QuantityOfDishes onQuantityChange={handleQuantityChange} />
        <CtaButton width="100%" height="2.5rem">
          Add for ${totalPrice}
        </CtaButton>
      </Container>
    </Section>
  );
};

export default OrderDelivery;
