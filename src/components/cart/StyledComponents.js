import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const Main = styled.main`
  padding: 2rem 15rem;
  background: #eaeded;
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
  width: 100%;
  background: #ffffff;
  padding: 1rem;
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
`;
