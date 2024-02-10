import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const Main = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 15rem;
  /* background: #eaeded; */
  min-height: 100vh;
  ${mq[3]} {
    padding: 2rem 10rem;
  }
  ${mq[2]} {
    padding: 2rem 5rem;
  }

  ${mq[1]} {
    padding: 1rem 2rem;
  }

  ${mq[0]} {
    padding: 1rem 1rem;
  }
`;

export const Container = styled.section`
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  width: 100%;
  background: #ffffff;
  padding: 1rem;
  ${mq[1]} {
    border: none;
    padding: 0;
  }
`;

// export const TotalPriceContainer = styled(Container)``;

export const Title = styled.h2`
  font-size: 1.5rem;
`;

export const Price = styled.p`
  color: #6c706e;
`;

export const TitleAndPrice = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  ${mq[1]} {
    display: none;
  }
`;

export const ShoppingCart = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr;
  gap: 1rem;

  ${mq[1]} {
    display: flex;
    flex-direction: column-reverse;
    gap: 0;
  }
`;

export const Divider = styled.div`
  margin-top: 1rem;
  border-bottom: 1px solid #ccc;
  ${mq[1]} {
    margin-bottom: 1rem;
  }
`;

export const Checkout = styled.div`
  width: 100%;
  height: 15rem;
  background: #ffffff;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  ${mq[1]} {
    height: 100%;
    border: none;
    padding: 0;
  }
`;

export const CheckoutContainer = styled.div`
  ${mq[1]} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const FreeDelivery = styled.p`
  margin-top: 1rem;
  color: #077e63;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  gap: 0.3rem;
  align-items: center;
  margin-bottom: 1rem;
`;
export const Icon = styled.span`
  font-size: 1rem;
`;
export const Subtotal = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  ${mq[1]} {
    margin-top: 1rem;
  }
`;

export const CenteredMessage = styled.p`
  margin-top: 20%;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
`;
