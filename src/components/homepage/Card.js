import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";

const CardContainer = styled.div`
  margin-bottom: 1rem;
  border: none;
  background: #efeeee;
  border-radius: 1rem 1rem 0 0;
  width: 17rem;
  color: #333333;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    border-radius: 0;
    width: auto;
    background: none;
    box-shadow: none;
  }
`;

const DishImageContainer = styled.div`
  width: 100%;
  height: 11rem;
  @media (max-width: 768px) {
    border-radius: 0;
    width: 8rem;
    height: 8.1rem;
  }
`;

const DishImage = styled.img`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    border-radius: 0;
    width: 8rem;
  }
`;

const DishName = styled.h3`
  font-size: 1rem;
`;

const DishPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #cd690c;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PriceAndDishRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DishDescription = styled.p`
  margin: 1rem 0 1.5rem 0;
  font-size: 0.9rem;
  text-align: justify;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Limit to 4 lines */
  -webkit-box-orient: vertical;
  @media (max-width: 768px) {
    margin: 0.8rem 0;
    text-align: left;
    -webkit-line-clamp: 2;
  }
`;

const Cta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  font-size: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Divider = styled.div`
  display: none;
  width: 100%;
  background: #bfbfbf6b;
  height: 1px;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Card = ({ image, name, price, description }) => {
  return (
    <>
      <CardContainer>
        <DishImageContainer>
          <DishImage src={image} alt={name} />
        </DishImageContainer>

        <div
          className={css`
            padding: 1rem;
            gap: 0.5rem;
            @media (max-width: 768px) {
              padding: 1rem 1rem 1rem 0;
            }
          `}
        >
          <PriceAndDishRow>
            <DishName>{name}</DishName>
            <DishPrice>${price}</DishPrice>
          </PriceAndDishRow>
          <DishDescription>{description}</DishDescription>
          <div
            className={css`
              font-weight: bold;
              display: none;
              @media (max-width: 768px) {
                display: block;
              }
            `}
          >
            ${price}
          </div>
          <Cta>
            Order a delivery
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "1.1rem",
                fontWeight: 500,
              }}
            >
              directions_bike
            </span>
          </Cta>
        </div>
      </CardContainer>
      <Divider />
    </>
  );
};

export default Card;
