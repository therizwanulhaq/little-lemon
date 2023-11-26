import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 13rem;
  height: 11rem;
  background: #efeeee;
  color: #333333;
`;

const ImageContainer = styled.div`
  width: 5rem;
  height: 5rem;
`;

const ProfilePhoto = styled.img`
  width: 5rem;
  height: 100%;
  object-fit: cover;
`;

const generateStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={css`
          color: ${i <= rating ? "#ffb700" : "#d3d3d3"};
        `}
      >
        ★
      </span>
    );
  }
  return stars;
};

const Testimonials = ({ name, image, comment, rating }) => {
  return (
    <>
      <Container>
        <p
          className={css`
            font-size: 1rem;
            font-weight: bold;
          `}
        >
          {name}
        </p>
        <div
          className={css`
            display: flex;
            align-items: center;
          `}
        >
          <ImageContainer>
            <ProfilePhoto src={image} alt={name} />
          </ImageContainer>
          <p
            className={css`
              margin-left: 0.5rem;
              font-size: 0.7rem;
              /* text-align: justify; */
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 6; /* Limit to 6 lines */
              -webkit-box-orient: vertical;
            `}
          >
            " {comment}"
          </p>
        </div>
        <div
          className={css`
            display: flex;
            align-items: center;
          `}
        >
          {generateStars(rating)}
          <span
            className={css`
              margin-left: 0.5rem;
            `}
          >
            ({rating})
          </span>
        </div>
      </Container>
    </>
  );
};

export default Testimonials;
