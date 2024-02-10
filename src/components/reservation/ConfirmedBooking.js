// ConfirmedBooking.js
import { css } from "@emotion/css";
import React from "react";
import { Link } from "react-router-dom";

const ConfirmedBooking = () => {
  return (
    <div
      className={css`
        height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      `}
    >
      <div>
        <h2>Booking Confirmed!</h2>
        <p
          className={css`
            margin: 2rem 0 7rem 0;
          `}
        >
          Your reservation has been successfully confirmed. A confirmation email
          will be sent to you shortly.
        </p>
        <Link
          to="/"
          className={css`
            color: black;
            text-decoration: underline;
          `}
        >
          Back to HomePage
        </Link>
      </div>
    </div>
  );
};

export default ConfirmedBooking;
