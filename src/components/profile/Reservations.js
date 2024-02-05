import React from "react";
import { useAuth } from "../context/AuthContext";
import { Main } from "./StyledComponents";

const Reservations = () => {
  const { userData } = useAuth();

  return (
    <Main>
      {userData?.reservationDetails?.map((reservation, index) => (
        <div key={index}>
          {Object.entries(reservation).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      ))}
    </Main>
  );
};

export default Reservations;
