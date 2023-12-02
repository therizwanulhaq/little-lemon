import React from "react";
import { Link } from "react-router-dom";

import CustomButton from "../common/CustomButton";
import TestimonialData from "./TestimonialData";
import AboutLittleLemon from "./AboutLittleLemon";
import Specials from "./Specials";

import Lemon from "../../assets/GreenLemon.png";
import img1 from "../../assets/Placeholder Image.jpg";

import {
  Container,
  Title,
  SubTitle,
  Description,
  Br,
  AdImg,
  BackgroundImage,
  TitleWithLines,
} from "./StyledComponents";

function Main() {
  return (
    <main>
      <Container
        display="flex"
        padding="2rem 15rem 1rem 15rem"
        background="#495e57f5"
      >
        <BackgroundImage imageUrl={Lemon} top="3rem" right="4rem" />
        <BackgroundImage
          imageUrl={Lemon}
          top="0rem"
          left="-2rem"
          rotation="-30deg"
        />
        <div>
          <Title>Little Lemon</Title>
          <SubTitle>Chicago</SubTitle>
          <Description>
            We are a family owned Mediterranean <Br /> restaurant, focused on
            traditional <Br /> recipes served with a modern twist.
          </Description>
          <Link to="/booking">
            <CustomButton>Reserve a Table</CustomButton>
          </Link>
        </div>
        <AdImg src={img1} alt="Delicious Mediterranean Cuisine" />
      </Container>
      <Specials />
      <TestimonialData />
      <TitleWithLines id="about">ABOUT LITTLE LEMON RESTAURANT</TitleWithLines>
      <AboutLittleLemon />
    </main>
  );
}

export default Main;
