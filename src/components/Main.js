import React from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import CustomButton from "./CustomButton";
import img1 from "../assets/Placeholder Image.jpg";
import DishList from "./DishList";

const fontFamily = `"Markazi Text", serif`;
const Container = styled.div`
  margin: ${(props) => props.margin || "0"};
  position: relative;
  padding: 0.5rem 15rem;
  background: ${(props) => props.background || "#495e57"};
  color: ${(props) => props.color || "#edefee"};
  @media (max-width: 768px) {
    padding: 0.5rem 2rem; // Adjust padding for smaller screens
  }
`;
const Title = styled.h1`
  font-family: ${fontFamily};
  font-size: ${(props) => props.fontSize || "4rem"};
  font-weight: 400;
  color: ${(props) => props.color || "#f4ce14"};
`;
const SubTitle = styled.h2`
  font-family: ${fontFamily};
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 1rem;
`;
const Description = styled.p`
  margin-top: 2.5rem;
  font-family: ${fontFamily};
  font-size: 1.7rem;
`;
const AdImg = styled.img`
  position: absolute;
  top: 1rem;
  right: 15rem;
  border-radius: 1rem;
  width: 17rem;
  height: 22rem;
  @media (max-width: 768px) {
    display: none; // Hide the image on smaller screens
  }
`;
function Main() {
  return (
    <main>
      <Container>
        <Title>Little Lemon</Title>
        <SubTitle>Chicago</SubTitle>
        <Description>
          We are a family owned Mediterranean <br /> restaurant, focused on
          traditional <br /> recipes served with a modern twist.
        </Description>
        <CustomButton>Reserve a Table</CustomButton>
        <AdImg src={img1} alt="Delicious Mediterranean Cuisine" />
      </Container>
      <Container background="white" margin="5rem 0">
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          `}
        >
          <Title color="#333333" fontSize="3rem">
            This Weeks Specials!
          </Title>
          <CustomButton>Online Menu</CustomButton>
        </div>
        <DishList />
      </Container>
    </main>
  );
}

export default Main;
