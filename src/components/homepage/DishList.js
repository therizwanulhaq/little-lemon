import React from "react";
import Card from "./Card";
import dish1Image from "../../assets/greek salad.jpg";
import dish2Image from "../../assets/bruschetta.jpg";
import dish3Image from "../../assets/lemon dessert.jpg";
import styled from "@emotion/styled";

const dishes = [
  {
    id: 1,
    image: dish1Image,
    name: "Greek Salad",
    price: 10.99,
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
  },
  {
    id: 2,
    image: dish2Image,
    name: "Bruschetta",
    price: 12.99,
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
  },
  {
    id: 3,
    image: dish3Image,
    name: "Lemon Desert",
    price: 12.99,
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
  },
];

const Dishes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 100%;
  cursor: pointer;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DishList = () => {
  return (
    <Dishes>
      {dishes.map((dish) => (
        <Card
          key={dish.id}
          image={dish.image}
          name={dish.name}
          price={dish.price}
          description={dish.description}
        />
      ))}
    </Dishes>
  );
};

export default DishList;
