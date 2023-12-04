import React from "react";
import styled from "@emotion/styled";
import dish1Image from "../../assets/greek salad.jpg";
import { CtaButton } from "../common/CustomButton";
import DishAddons from "./DishAddons";
import QuantityOfDishes from "./TotalPrice";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const addons = [
  { id: 1, name: "Avocado", price: "1" },
  { id: 2, name: "Seeds", price: "1" },
  { id: 3, name: "Dressing", price: "1" },
];

const quantity = 1;

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

const OrderDelivery = () => {
  return (
    <Section>
      <div>
        <DishImage src={dish1Image} alt="dish1" />
        <DishDetailsContainer>
          <PriceAndDishRow>
            <DishName>Greek Salad</DishName>
            <DishPrice>$12.99</DishPrice>
          </PriceAndDishRow>
          <DishDescription>
            The famous greek salad of crispy lettuce, peppers, olives and our
            Chicago style feta cheese, garnished with crunchy garlic and
            rosemary croutons.
          </DishDescription>
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
          <DishAddons key={id} name={name} price={price} quantity={quantity} />
        ))}
        <QuantityOfDishes quantity={quantity} />
        <CtaButton width="100%" height="2.5rem">
          Add for $15.99
        </CtaButton>
      </Container>
    </Section>
  );
};

export default OrderDelivery;
