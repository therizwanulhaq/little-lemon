import React from "react";
import Testimonials from "./Testimonials";
import img1 from "../../assets/Kurumi.jpg";
import styled from "@emotion/styled";

const testimonials = [
  {
    id: 1,
    image: img1,
    name: "Kurumi",
    comment: "abc",
    rating: "4.7",
  },
  {
    id: 2,
    image: img1,
    name: "Kurumi",
    comment:
      "The food was yummy can't wait to eat another time gogo gaga mf. The food was yummy can't wait to eat another time gogo gaga mf ",
    rating: "3.5",
  },
  {
    id: 3,
    image: img1,
    name: "Kurumi",
    comment: "abc",
    rating: "5.0",
  },
  {
    id: 4,
    image: img1,
    name: "Kurumi",
    comment: "abc",
    rating: "2.0",
  },
];

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function TestimonialData() {
  return (
    <Card>
      {testimonials.map((data) => (
        <Testimonials
          key={data.id}
          name={data.name}
          image={data.image}
          rating={data.rating}
          comment={data.comment}
        />
      ))}
    </Card>
  );
}

export default TestimonialData;
