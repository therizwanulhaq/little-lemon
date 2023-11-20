// Urls.js
import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import BookingForm from "./BookingForm";
import ConfirmedBooking from "./ConfirmedBooking";
import { useNavigate } from "react-router-dom";
import { fetchAPI, submitAPI } from "./BookingsAPI";

const Urls = () => {
  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_TIMES":
        return action.payload;
      default:
        return state;
    }
  };

  const [availableTimes, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const initializeTimes = async () => {
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`;
        const times = fetchAPI(formattedDate);
        // Update state with the fetched times
        dispatch({ type: "UPDATE_TIMES", payload: times });
      } catch (error) {
        console.error("Error fetching available times:", error);
      }
    };

    initializeTimes();
  }, []);

  const updateTimes = async (selectedDate) => {
    try {
      const times = fetchAPI(selectedDate);
      // Update state with the fetched times
      dispatch({ type: "UPDATE_TIMES", payload: times });
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  const submitForm = async (formData) => {
    try {
      const success = submitAPI(formData);
      if (success) {
        // Navigate to the booking confirmation page
        navigate("/confirmed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/booking"
          element={
            <BookingForm
              availableTimes={availableTimes}
              updateTimes={updateTimes}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </>
  );
};

export default Urls;
