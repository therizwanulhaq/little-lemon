import React, { useState } from "react";
import styled from "@emotion/styled";
import { CustomButton } from "../common/CustomButton";
import { useAppDataContext } from "../context/AppDataContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../common/StyledComponents";

const focusColor = "#f4ce14";

const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  max-width: 20rem;
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
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #ccc;
  outline: none;
  appearance: textfield;

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

const ErrorMessage = styled.div`
  margin-top: 0.3rem;
  color: red;
  font-size: 0.8rem;
`;

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // Add leading zero if month or day is a single digit
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}

const BookingForm = () => {
  const [date, setDate] = useState(getCurrentDate());
  const [time, setTime] = useState("17:00");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [loading, setLoading] = useState(false);

  const { reservationTimes } = useAppDataContext();
  const { updateUserData } = useAuth();

  const navigate = useNavigate();

  // Filter available times based on the selected date
  const availableTimesForSelectedDate = reservationTimes.find(
    (time) => time.date === date
  )?.availableTimes;

  const invalidDateErrorMessage = "Please choose a valid date";
  const invalidNumberOfGuestsErrorMessage =
    "Please enter a number between 1 and 10";

  const isDateValid = () => date !== "" && date >= getCurrentDate();

  const isNumberOfGuestsValid = () =>
    guests !== "" && guests > 0 && guests < 11;

  const areAllFieldsValid = () => isDateValid() && isNumberOfGuestsValid();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updateFields = {
        reservationDetails: [{ date, time, guests, occasion }],
      };

      await updateUserData(updateFields);
      setLoading(false);
      navigate("/booking/confirmed");
    } catch (error) {
      setLoading(false);
      console.log("Error updating user data", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Book Now</Title>

        <Label htmlFor="res-date" hasError={!isDateValid()}>
          Choose Date:
        </Label>
        <Input
          type="date"
          id="res-date"
          required
          min={getCurrentDate()}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        {isDateValid() ? null : (
          <ErrorMessage>{invalidDateErrorMessage}</ErrorMessage>
        )}

        <Label htmlFor="res-time">Choose Time:</Label>
        <Select
          id="res-time"
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {availableTimesForSelectedDate ? (
            availableTimesForSelectedDate.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))
          ) : (
            <option disabled>No reservations available</option>
          )}
        </Select>

        <Label htmlFor="guests" hasError={!isNumberOfGuestsValid()}>
          Number of Guests:
        </Label>
        <Input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          required
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        {isNumberOfGuestsValid() ? null : (
          <ErrorMessage>{invalidNumberOfGuestsErrorMessage}</ErrorMessage>
        )}

        <Label htmlFor="occasion">Occasion:</Label>
        <Select
          id="occasion"
          required
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value="birthday">Birthday</option>
          <option value="wedding">Wedding</option>
          <option value="anniversary">Anniversary</option>
        </Select>

        <CustomButton
          type="submit"
          borderRadius="0.3rem"
          width="20rem"
          height="2.7rem"
          disabled={!areAllFieldsValid()}
        >
          {loading ? (
            <Loader width="1.1rem" height="1.1rem" border="3px solid black" />
          ) : (
            "Make Your reservation"
          )}
        </CustomButton>
      </Form>
    </Container>
  );
};

export default BookingForm;
