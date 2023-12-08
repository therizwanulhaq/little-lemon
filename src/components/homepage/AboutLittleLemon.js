import React from "react";
import { css } from "@emotion/css";

import {
  Title,
  SubTitle,
  Description,
  ImageContainer,
  Img2,
  AboutLilLemonContainer,
} from "./StyledComponents";

import img2 from "../../assets/MarioAndAdrian.jpg";
import restaurant from "../../assets/restaurant.jpg";

const AboutLittleLemon = () => {
  return (
    <>
      <AboutLilLemonContainer
        backgroundImage={restaurant}
        background="#131917de"
        color="#bfbfbff7"
        padding="3rem 15rem"
      >
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: last baseline;
            gap: 3rem;
            @media (max-width: 768px) {
              display: block;
            }
          `}
        >
          <div>
            <Title>Little Lemon</Title>
            <SubTitle>Chicago</SubTitle>
            <Description fontSize="1.5rem" textAlign="justify">
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
            </ImageContainer>
          </div>
        </div>
      </AboutLilLemonContainer>
    </>
  );
};

export default AboutLittleLemon;
