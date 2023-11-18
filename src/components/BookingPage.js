import React from "react";
import CustomButton from "./CustomButton";
import styled from "@emotion/styled";

const Padding = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 15rem;
  @media (max-width: 768px) {
    padding: 0.5rem 2rem; // Adjust padding for smaller screens
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.5rem 0.3rem;
  border-radius: 0.3rem;
`;

const Select = styled.select`
  padding: 0.5rem 0.3rem;
  border-radius: 0.3rem;
`;

const BookingPage = () => {
  return (
    <>
      <Padding>
        <Form>
          <Label htmlFor="date">Choose Date</Label>
          <Input type="date" id="date" />
          <Label htmlFor="time">Choose Time</Label>
          <Select id="time">
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
            <option>20:00</option>
            <option>21:00</option>
            <option>22:00</option>
          </Select>
          <Label htmlFor="guests">Number of guests</Label>
          <Input type="number" id="guests" placeholder="1" min="1" max="10" />
          <Label htmlFor="occasion">Occasion</Label>
          <Select id="occasion">
            <option>Birthday</option>
            <option>Anniversary</option>
          </Select>
          <CustomButton type="submit">Make Your reservation</CustomButton>
        </Form>
      </Padding>
    </>
  );
};

export default BookingPage;
