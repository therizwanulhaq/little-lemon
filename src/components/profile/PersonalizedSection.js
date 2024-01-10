import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  /* @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  } */
`;

const PersonalizedContainer = styled.div`
  cursor: pointer;
  padding: 0.9rem 1.1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  @media (max-width: 1200px) {
    gap: 2rem;
  }

  :hover {
    background: #eeeeee;
  }
`;

const Icon = styled.span`
  color: #576b64;
  font-size: 2.3rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h2`
  color: #333333;
  font-size: 1rem;
  font-weight: 500;
`;

const Description = styled.p`
  color: #333333;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Tile = ({ icon, title, description, path }) => (
  <Link to={path}>
    <PersonalizedContainer>
      <Icon className="material-symbols-outlined">{icon}</Icon>
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
    </PersonalizedContainer>
  </Link>
);

const PersonalizedSection = () => {
  const personalizedData = [
    {
      icon: "inventory_2",
      title: "Your Orders",
      description: "Track your orders",
      path: "/account/orders",
    },
    {
      icon: "security",
      title: "Login & Security",
      description: "Edit login, name, and email",
      path: "/account/manage",
    },
    {
      icon: "shopping_cart",
      title: "Cart",
      description: "Check out your cart",
      path: "/cart",
    },
    {
      icon: "home_pin",
      title: "Your addresses",
      description: "Edit addresses for orders",
      path: "/your-addresses",
    },
  ];

  return (
    <Section>
      {personalizedData.map((data, index) => (
        <Tile key={index} {...data} />
      ))}
    </Section>
  );
};

export default PersonalizedSection;
