import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3rem;
  height: 3rem;
  transform: translate(-50%, 50%);
`;

const rotation = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  border-top: 3px solid #000;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

const Spinner = () => (
  <LoaderWrapper>
    <Loader />
  </LoaderWrapper>
);

export default Spinner;
