// ConfirmedBooking.js
import { css } from "@emotion/css";
import React from "react";

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
            margin-top: 1rem;
          `}
        >
          Your reservation has been confirmed. Thank you!
        </p>
      </div>
    </div>
  );
};

export default ConfirmedBooking;
