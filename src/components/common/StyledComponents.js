import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";

const rotation = keyframes`
 0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Loader = styled.span`
  width: ${(props) => props.width || "2.5rem"};
  height: ${(props) => props.height || "2.5rem"};
  border: ${(props) => props.border || "5px solid #f0f2f2"};
  border-bottom-color: #558b7b;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
