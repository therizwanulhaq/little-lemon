import styled from "@emotion/styled";
import React from "react";

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
`;

const Icon = styled.span`
  color: #576b64;
  font-size: 2.3rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
`;

const Description = styled.p`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Tile = ({ icon, title, description }) => (
  <PersonalizedContainer>
    <Icon className="material-symbols-outlined">{icon}</Icon>
    <div>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </div>
  </PersonalizedContainer>
);

const PersonalizedSection = () => {
  const personalizedData = [
    {
      icon: "inventory_2",
      title: "Your Orders",
      description: "Track your orders",
    },
    {
      icon: "security",
      title: "Login & Security",
      description: "Edit login, name, and email",
    },
    {
      icon: "shopping_cart",
      title: "Cart",
      description: "Check out your cart",
    },
    {
      icon: "home_pin",
      title: "Your addresses",
      description: "Edit addresses for orders",
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
