import React from "react";
import { Route, Routes } from "react-router-dom";
import BookingForm from "../reservation/BookingForm";
import ConfirmedBooking from "../reservation/ConfirmedBooking";
import OrderOnline from "../order_online/OrderOnline";
import OrderDelivery from "../order_online/OrderDelivery";
import ScrollToTop from "./ScrollToTop";
import Homepage from "../homepage/Homepage";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Profile from "../profile/Profile";
import { useAuth } from "../context/AuthContext";
import PageNotFound from "./PageNotFound";
import ResetPassword from "../auth/ResetPassword";
import SetNewPassword from "../auth/SetNewPassword";
import Cart from "../cart/Cart";
import YourOrders from "../profile/YourOrders";
import LoginAndSecurity from "../profile/LoginAndSecurity";
import ChangeName from "../profile/ChangeName";
import ChangeEmail from "../profile/ChangeEmail";
import ChangePassword from "../profile/ChangePassword";
import Dashboard from "../dashboard/Dashboard";
import Test from "./Test";
import Reservations from "../profile/Reservations";

const Urls = () => {
  const { user } = useAuth();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="order-online" element={<OrderOnline />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="set-new-password" element={<SetNewPassword />} />

        <Route path="test" element={<Test />} />

        <Route path="booking" element={<BookingForm />} />
        <Route path="booking/confirmed" element={<ConfirmedBooking />} />
        <Route path="order-online/:dishName" element={<OrderDelivery />} />
        {user ? (
          <Route path="user/:username" element={<Profile />} />
        ) : (
          <>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </>
        )}

        <Route path="cart" element={<Cart />} />
        <Route path="account/orders" element={<YourOrders />} />
        <Route path="your-reservations" element={<Reservations />} />
        <Route path="account/manage" element={<LoginAndSecurity />} />
        <Route path="account/manage/change-name" element={<ChangeName />} />
        <Route path="account/manage/change-email" element={<ChangeEmail />} />
        <Route
          path="account/manage/change-password"
          element={<ChangePassword />}
        />
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Urls;
