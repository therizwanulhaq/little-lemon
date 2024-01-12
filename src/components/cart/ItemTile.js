import styled from '@emotion/styled';
import React from 'react'

import DishQuantity from "./DishQuantity";

const ShoppingCartTile = styled.div`
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

const DishImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
`;

const DishImage = styled.img`
  width: 8rem;
  height: 100%;
  object-fit: cover;
`;

const DishInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DishName = styled.h4`
  font-size: 1.2rem;
`;

const DishDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

const DishPrice = styled.div`
  font-weight: bold;
`;

const Cta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #ccc;
`;

const CtaOption = styled.p`
color: #00a0d0;
`

export const ItemTile = ({ name, image, description, price }) => {
  return (
  
      <ShoppingCartTile key={name}>
    <DishImageContainer>
      <DishImage src={image} alt="Dish" />
    </DishImageContainer>
    <DishInfo>
      <DishName>{name}</DishName>
      <DishDescription>{description}</DishDescription>
      <Cta>
        <DishQuantity /> |<CtaOption >Delete</CtaOption> |<CtaOption>Share</CtaOption>
      </Cta>
    </DishInfo>
    <DishPrice>{price}</DishPrice>
  </ShoppingCartTile>
  )
}
