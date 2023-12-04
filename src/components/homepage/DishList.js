import React from "react";
import Card from "./Card";
import styled from "@emotion/styled";
import { useDishContext } from "../context/Context";
import { Link } from "react-router-dom";

const Dishes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 100%;
  cursor: pointer;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const toSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

const DishList = () => {
  const dishList = useDishContext();
  return (
    <Dishes>
      {dishList.map((dish) => (
        <Link key={dish.id} to={`/order-delivery/${toSlug(dish.name)}`}>
          <Card
            image={dish.image}
            name={dish.name}
            price={dish.price}
            description={dish.description}
          />
        </Link>
      ))}
    </Dishes>
  );
};

export default DishList;
