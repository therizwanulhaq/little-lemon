import React from "react";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";

import CustomButton from "../common/CustomButton";
import TestimonialData from "./TestimonialData";
import Specials from "./Specials";

import {
  Container,
  Title,
  SubTitle,
  Description,
  AdImg,
  ImageContainer,
  Img2,
  Img3,
} from "./StyledComponents";

import img1 from "../../assets/Placeholder Image.jpg";
import img2 from "../../assets/Mario and Adrian A.jpg";
import img3 from "../../assets/restaurant.jpg";

function Main() {
  return (
    <main>
      <Container display="flex">
        <div>
          <Title>Little Lemon</Title>
          <SubTitle>Chicago</SubTitle>
          <Description>
            We are a family owned Mediterranean <br /> restaurant, focused on
            traditional <br /> recipes served with a modern twist.
          </Description>
          <Link to="/booking">
            <CustomButton>Reserve a Table</CustomButton>
          </Link>
        </div>
        <AdImg src={img1} alt="Delicious Mediterranean Cuisine" />
      </Container>
      <Specials />
      <Container padding="5rem 15rem">
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
      <Container
        background="white"
        color="#333333"
        padding="5rem 15rem 10rem 15rem"
      >
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <div>
            <Title>Little Lemon</Title>
            <SubTitle>Chicago</SubTitle>
            <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              at ex leo. Maecenas enim sem, laoreet at nulla ac, luctus
              scelerisque massa. Praesent ut molestie nisi. Aliquam arcu lorem,
              auctor condimentum blandit id, lobortis in nisi. Ut diam justo,
              euismod in accumsan id, vehicula sit amet tellus. Pellentesque
            </Description>
          </div>
          <div>
            <ImageContainer>
              <Img2 src={img2} alt="Little Lemon Restaurant" />
              <Img3 src={img3} alt="Adrian" />
            </ImageContainer>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Main;
