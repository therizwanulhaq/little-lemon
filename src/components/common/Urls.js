import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import BookingForm from "../reservation/BookingForm";
import ConfirmedBooking from "../reservation/ConfirmedBooking";
import { useNavigate } from "react-router-dom";
import { fetchAPI, submitAPI } from "../reservation/BookingsAPI";
import OrderOnline from "../order_online/OrderOnline";
import OrderDelivery from "../order_online/OrderDelivery";
import ScrollToTop from "./ScrollToTop";
import Homepage from "../homepage/Homepage";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Profile from "../profile/Profile";
import { useAuth } from "../context/AuthContext";
import PageNotFound from "./PageNotFound";
import TestPage from "./TestPage";
import ResetPassword from "../auth/ResetPassword";
import SetNewPassword from "../auth/SetNewPassword";
import Cart from "../cart/Cart";
import YourOrders from "../profile/YourOrders";
import YourAddresses from "../profile/YourAddresses";
import LoginAndSecurity from "../profile/LoginAndSecurity";
import ChangeName from "../profile/ChangeName";
import ChangeEmail from "../profile/ChangeEmail";
import ChangePassword from "../profile/ChangePassword";
import Dashboard from "../dashboard/Dashboard";

const Urls = () => {
  const { user } = useAuth();
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
        navigate("/booking/confirmed");
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
        <Route path="/order-online" element={<OrderOnline />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />

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
        <Route path="/booking/confirmed" element={<ConfirmedBooking />} />
        <Route path="/order-online/:dishName" element={<OrderDelivery />} />
        {user ? (
          <Route path="profile/:username" element={<Profile />} />
        ) : (
          <>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
        )}

        <Route path="/cart" element={<Cart />} />
        <Route path="/account/orders" element={<YourOrders />} />
        <Route path="/your-addresses" element={<YourAddresses />} />
        <Route path="/account/manage" element={<LoginAndSecurity />} />
        <Route path="/account/manage/change-name" element={<ChangeName />} />
        <Route path="/account/manage/change-email" element={<ChangeEmail />} />
        <Route
          path="/account/manage/change-password"
          element={<ChangePassword />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Urls;
