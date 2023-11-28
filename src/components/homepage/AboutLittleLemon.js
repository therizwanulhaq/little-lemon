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
import img3 from "../../assets/restaurantwfixedclrs.jpg";

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
              Little Lemon is owned by two Italian brothers, Mario and Adrian,
              who moved to the United States to pursue their shared dream of
              owning a restaurant. <br />
              To craft the menu, Mario relies on family recipes and his
              experience as a chef in Italy. Adrian does all the marketing for
              the restaurant and led the effort to expand the menu beyond
              classic Italian to incorporate additional cuisines from the
              Mediterranean region.
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
