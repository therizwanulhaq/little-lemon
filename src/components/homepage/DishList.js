import React from "react";
import Card from "./Card";
import styled from "@emotion/styled";
import { useDishContext } from "../context/Context";
import { Link } from "react-router-dom";
import { toSlug } from "../common/Utils";

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

const DishList = () => {
  const dishList = useDishContext();
  // Limit the displayed dishes to only three
  const limitedDishList = dishList.slice(25, 28);
  return (
    <Dishes>
      {limitedDishList.map((dish) => (
        <Link key={dish.id} to={`/order-online/${toSlug(dish.name)}`}>
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
