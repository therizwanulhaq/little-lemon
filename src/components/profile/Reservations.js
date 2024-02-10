import React from "react";
import { useAuth } from "../context/AuthContext";
import { Main } from "./StyledComponents";
import styled from "@emotion/styled";

const Container = styled.div`
  background: #f7f7f7;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: fit-content;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
`;

const Content = styled.p`
  margin-top: 0.2rem;
  font-size: 0.9rem;
  font-weight: 400;
  text-transform: capitalize;
`;

const CancelButton = styled.button`
  cursor: pointer;
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.3rem 1rem;
  border: 1px solid #d5d9d9;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 2px 5px rgba(213, 217, 217, 0.5);

  :hover {
    background: red;
    color: white;
  }
`;

const CenteredMessage = styled.p`
  margin-top: 20%;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
`;

const Reservations = () => {
  const { userData } = useAuth();

  const reservationData = userData?.reservationDetails;
  return (
    <Main>
      {!reservationData ? (
        <CenteredMessage>You have no reservations!</CenteredMessage>
      ) : (
        reservationData.map((reservation, index) => (
          <Container key={index}>
            <Header>Reservation on {reservation.date}</Header>
            <Content>Time: {reservation.time}</Content>
            <Content>Guests: {reservation.guests}</Content>
            <Content>Occasion: {reservation.occasion}</Content>

            <CancelButton>Cancel Reservation</CancelButton>
          </Container>
        ))
      )}
    </Main>
  );
};

export default Reservations;
