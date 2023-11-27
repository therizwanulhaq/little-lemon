import React from "react";
import Testimonials from "./Testimonials";
import img1 from "../../assets/danny-ocean.jpg";
import img2 from "../../assets/stefan-stefancik-.jpg";
import img3 from "../../assets/muhammad-haikal-sjukri.jpg";
import img4 from "../../assets/kelly-sikkema.jpg";
import styled from "@emotion/styled";

const testimonials = [
  {
    id: 1,
    image: img1,
    name: "Sergio De Paula",
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 100%;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-bottom: 2rem;
  }
`;

function TestimonialData() {
  return (
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
  );
}

export default TestimonialData;
