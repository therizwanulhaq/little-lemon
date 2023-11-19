import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import BookingPage from "./BookingPage";

const Urls = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </>
  );
};

export default Urls;
