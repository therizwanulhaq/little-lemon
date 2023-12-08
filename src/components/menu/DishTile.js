import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";

const breakpoints = [576, 768, 992, 1200, 1300];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const CardContainer = styled.div`
  /* margin-bottom: 1rem; */
  border: none;
  background: #efeeee;
  border-radius: 0.5rem;
  width: 100%;
  overflow: hidden;
  height: auto;
  color: #333333;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  ${mq[1]} {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    border-radius: 0;
    background: none;
    box-shadow: none;
    margin-bottom: 1rem;
  }
`;

const DishImageContainer = styled.div`
  width: 100%;
  height: 10rem;
  ${mq[1]} {
    border-radius: 0;
    width: 8rem;
    height: 8rem;
  }
`;

const DishImage = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  ${mq[1]} {
    width: 8rem;
  }
`;

const DishName = styled.h3`
  font-size: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Limit to 1 lines */
  -webkit-box-orient: vertical;
`;

const DishPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #cd690c;
  ${mq[1]} {
    display: none;
  }
`;

const PriceAndDishRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DishDescription = styled.p`
  margin: 1rem 0 0 0;
  font-size: 0.9rem;
  /* text-align: justify; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  ${mq[1]} {
    margin: 0.8rem 0;
    text-align: left;
    -webkit-line-clamp: 2;
  }
`;

const Divider = styled.div`
  display: none;
  width: 100%;
  background: #bfbfbf6b;
  height: 1px;
  margin-bottom: 1rem;
  ${mq[1]} {
    display: block;
  }
`;

const DishCard = ({ image, name, price, description }) => {
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
            ${mq[1]} {
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
              ${mq[1]} {
                display: block;
              }
            `}
          >
            ${price}
          </div>
        </div>
      </CardContainer>
      <Divider />
    </>
  );
};

export default DishCard;
