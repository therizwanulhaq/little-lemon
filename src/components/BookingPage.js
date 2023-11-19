import React, { useState } from "react";
import styled from "@emotion/styled";
import CustomButton from "./CustomButton";

const focusColor = "#f4ce14";

const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  max-width: 400px;
  border: none;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.7rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #ccc;
  outline: none;
  appearance: textfield;
  margin-bottom: 1rem;

  &:focus {
    border-color: ${focusColor};
  }
  /* Remove the arrows on the number input */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #ccc;
  outline: none;
  margin-bottom: 1rem;

  appearance: none;
  background-image: url("https://fonts.gstatic.com/s/i/materialiconsoutlined/keyboard_arrow_down/v6/24px.svg"); /* Google Icons arrow-down */
  background-repeat: no-repeat;
  background-position: calc(100% - 0.5rem) center; /* Adjust the value as needed */

  &:focus {
    border-color: ${focusColor};
  }
`;

const availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

const BookingPage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("17:00");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  return (
    <Container>
      <Form>
        <Title>Booking Form</Title>

        <Label htmlFor="res-date">Choose Date:</Label>
        <Input
          type="date"
          id="res-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Label htmlFor="res-time">Choose Time:</Label>
        <Select
          id="res-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {availableTimes.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </Select>

        <Label htmlFor="guests">Number of Guests:</Label>
        <Input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />

        <Label htmlFor="occasion">Occasion:</Label>
        <Select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value="birthday">Birthday</option>
          <option value="wedding">Wedding</option>
          <option value="anniversary">Anniversary</option>
        </Select>

        <CustomButton type="submit" borderRadius="0.3rem" width="100%">
          Make Your reservation
        </CustomButton>
      </Form>
    </Container>
  );
};

export default BookingPage;
