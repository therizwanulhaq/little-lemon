import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  border-radius: 1rem;
  background: #efeeee;
  color: #333333;

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0.7rem;
    width: 9rem;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin-right: 1rem;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }
`;

const ProfilePhoto = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: contain;

  @media (max-width: 768px) {
    object-fit: cover;
    width: 2rem;
  }
`;

const Name = styled.p`
  font-size: 0.8rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const Username = styled.p`
  margin-top: 0.2rem;
  font-size: 0.7rem;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
`;

const Comment = styled.p`
  font-size: 0.7rem;
  font-weight: 500;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const generateStars = (rating) => {
  const roundedRating = Math.round(rating); // Round the rating to the nearest whole number
  const stars = [];
  const maxStars = 5;

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span
        key={i}
        className={css`
          padding: 0 0.2rem;
          font-size: 1.2rem;
          color: ${i <= roundedRating ? "#ffb700" : "#d3d3d3"};

          @media (max-width: 768px) {
            padding: 0;
          }
        `}
      >
        ★
      </span>
    );
  }
  return stars;
};

const Testimonials = ({ name, username, image, comment, rating }) => {
  return (
    <>
      <Container>
        <Profile>
          <ImageContainer>
            <ProfilePhoto src={image} alt={name} />
          </ImageContainer>
          <div>
            <Name>{name}</Name>
            <Username>{username}</Username>
          </div>
        </Profile>
        <Comment>"{comment}"</Comment>
        <Rating>
          {generateStars(rating)}
          <span
            className={css`
              margin-left: auto;
              font-size: 0.8rem;
              font-weight: bold;
            `}
          >
            ({rating})
          </span>
        </Rating>
      </Container>
    </>
  );
};

export default Testimonials;
