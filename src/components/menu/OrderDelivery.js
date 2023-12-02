import React from "react";
import styled from "@emotion/styled";
import dish1Image from "../../assets/greek salad.jpg";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const Section = styled.section`
  padding: 0 15rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);

  ${mq[3]} {
    padding: 0 10rem;
  }
  ${mq[2]} {
    padding: 0 5rem;
  }

  ${mq[1]} {
    padding: 0;
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  ${mq[1]} {
    padding: 0 2rem;
  }
  ${mq[1]} {
    padding: 0 1rem;
  }
`;
const DishImage = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
`;

const DishDetails = styled.div`
  ${mq[1]} {
    padding: 0 2rem;
  }
  ${mq[0]} {
    padding: 0 1rem;
  }
`;

const DishName = styled.h3`
  font-size: 1.3rem;
`;

const DishPrice = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #cd690c;
`;

const PriceAndDishRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const DishDescription = styled.p`
  margin: 1.5rem 0;
  font-size: 1rem;
  text-align: justify;
`;

const Cta = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Divider = styled.div`
  width: 100%;
  background: #bfbfbf6b;
  height: 1px;
  margin-bottom: 1rem;
`;

const OrderDelivery = () => {
  return (
    <Section>
      <div>
        <DishImage src={dish1Image} alt="dish1" />
        <DishDetails>
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
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              directions_bike
            </span>
            Delivery Time:
            <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              30 minutes
            </span>
          </Cta>
        </DishDetails>
      </div>
      <Container>
        <h3>Add</h3>
        <p>Avocado</p>
        <Divider />
        <p>Seeds</p>
        <Divider />
        <p>Dressing</p>
        <Divider />
      </Container>
    </Section>
  );
};

export default OrderDelivery;
