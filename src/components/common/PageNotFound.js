import styled from "@emotion/styled";
import React from "react";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const PageNotFound = () => {
  return (
    <Center>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </Center>
  );
};

export default PageNotFound;
