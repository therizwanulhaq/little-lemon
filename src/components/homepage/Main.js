import React from "react";
import { Link } from "react-router-dom";

import CustomButton from "../common/CustomButton";
import TestimonialData from "./TestimonialData";
import Specials from "./Specials";
import Lemon from "../../assets/GreenLemon.png";

import {
  Container,
  Title,
  SubTitle,
  Description,
  Br,
  AdImg,
  BackgroundImage,
} from "./StyledComponents";

import img1 from "../../assets/Placeholder Image.jpg";
import AboutLittleLemon from "./AboutLittleLemon";

function Main() {
  return (
    <main>
      <Container display="flex" padding="1rem 15rem" background="#495e57f5">
        <BackgroundImage imageUrl={Lemon} top="3rem" right="3rem" />
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
      <Container background="#495e57ee" padding="5rem 15rem">
        <BackgroundImage
          imageUrl={Lemon}
          top="0"
          left="-20rem"
          width="50rem"
          height="50rem"
          rotation="5deg"
        />
        <BackgroundImage
          imageUrl={Lemon}
          top="0rem"
          right="0rem"
          rotation="-30deg"
        />
        <Title
          color="#edefee"
          fontSize="3rem"
          textAlign="center"
          margin="0 0 2rem 0"
        >
          What our customers say!
        </Title>
        <TestimonialData />
      </Container>
      <AboutLittleLemon />
    </main>
  );
}

export default Main;
