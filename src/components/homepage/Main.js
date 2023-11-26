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
} from "./StyledComponents";

import img1 from "../../assets/Placeholder Image.jpg";
import AboutLittleLemon from "./AboutLittleLemon";

function Main() {
  return (
    <main>
      <Container display="flex" padding="1rem 15rem" backgroundImage={Lemon}>
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
      <Container>
        <Title
          color="#edefee"
          fontSize="3rem"
          textAlign="center"
          margin="0 0 1.5rem 0"
        >
          Testimonials
        </Title>
        <TestimonialData />
      </Container>
      <AboutLittleLemon />
    </main>
  );
}

export default Main;
