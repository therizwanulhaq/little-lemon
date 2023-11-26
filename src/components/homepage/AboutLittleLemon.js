import React from "react";
import { css } from "@emotion/css";

import {
  Container,
  Title,
  SubTitle,
  Description,
  ImageContainer,
  Img2,
  Img3,
} from "./StyledComponents";

import img2 from "../../assets/Mario and Adrian A.jpg";
import img3 from "../../assets/restaurant.jpg";

const AboutLittleLemon = () => {
  return (
    <>
      <Container background="white" color="#333333">
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
    </>
  );
};

export default AboutLittleLemon;
