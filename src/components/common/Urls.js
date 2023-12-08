import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import BookingForm from "../reservation/BookingForm";
import ConfirmedBooking from "../reservation/ConfirmedBooking";
import { useNavigate } from "react-router-dom";
import { fetchAPI, submitAPI } from "../reservation/BookingsAPI";
import Menu from "../menu/Menu";
import OrderDelivery from "../menu/OrderDelivery";
import ScrollToTop from "./ScrollToTop";
import Homepage from "../homepage/Homepage";
import OrderOnline from "../homepage/OrderOnline";

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
        // Navigate to the booking confirmation pages
        navigate("/confirmed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="order-online" element={<OrderOnline />} />
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
        <Route path="/order-delivery/:dishName" element={<OrderDelivery />} />
      </Routes>
    </>
  );
};

export default Urls;
