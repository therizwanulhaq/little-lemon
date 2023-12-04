import React from "react";
import Testimonials from "./Testimonials";
import img1 from "../../assets/danny-ocean.jpg";
import img2 from "../../assets/stefan-stefancik-.jpg";
import img3 from "../../assets/muhammad-haikal-sjukri.jpg";
import img4 from "../../assets/kelly-sikkema.jpg";
import styled from "@emotion/styled";
import Lemon from "../../assets/GreenLemon.png";

import { Title, BackgroundImage, ReviewContainer } from "./StyledComponents";

const testimonials = [
  {
    id: 1,
    image: img1,
    name: "Sergio Paula",
    username: "danny_ocean",
    comment: "Awesome place peaceful atmosphere with delicious food.",
    rating: "5.0",
  },
  {
    id: 2,
    image: img2,
    name: "Stefan Stefancik",
    username: "stefancik_st3",
    comment: "Really enjoyed the atmosphere.",
    rating: "5.0",
  },
  {
    id: 3,
    image: img3,
    name: "Haikal Sjukri",
    username: "sjukri_444",
    comment: "You have to try the Greek Salad!",
    rating: "5.0",
  },
  {
    id: 4,
    image: img4,
    name: "Kelly Sikkema",
    username: "kelly_sikemma",
    comment: "Loved the Bruschetta",
    rating: "4.9",
  },
];

const Card = styled.div`
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 100%;
  overflow-x: auto;
  ::-webkit-scrollbar {
    height: 1px; /* Set the width of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cccccc00; /* Set the color of the scrollbar thumb */
  }

  ::-webkit-scrollbar-track {
    background-color: #cccccc00; /* Set the color of the scrollbar track */
  }
  @media (max-width: 768px) {
    margin: 0 0;
    > :first-of-type {
      margin-left: 1rem;
    }
    > :last-child {
      margin-right: 1rem;
    }
  }
`;

function TestimonialData() {
  return (
    <>
      <ReviewContainer
        background="#ccccccf0"
        color="#0000007d"
        padding="5rem 15rem"
      >
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
          top="1rem"
          right="3rem"
          rotation="-30deg"
        />
        <Title
          color="#0000007d"
          fontSize="3rem"
          textAlign="center"
          margin="0 0 2rem 0"
        >
          What our customers say!
        </Title>
        <Card>
          {testimonials.map((data) => (
            <Testimonials
              key={data.id}
              name={data.name}
              username={data.username}
              image={data.image}
              rating={data.rating}
              comment={data.comment}
            />
          ))}
        </Card>
      </ReviewContainer>
    </>
  );
}

export default TestimonialData;
