import React, { useState } from "react";
import { Main } from "../profile/StyledComponents";
import { useAppDataContext } from "../context/AppDataContext";

const Test = () => {
  const { reservationTimes } = useAppDataContext();
  const [selectedDate, setSelectedDate] = useState("");

  // Filter available times based on the selected date
  const availableTimesForSelectedDate = reservationTimes.find(
    (time) => time.date === selectedDate
  )?.availableTimes;

  return (
    <Main>
      <input
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}
        value={selectedDate}
      ></input>
      <select>
        {availableTimesForSelectedDate ? (
          availableTimesForSelectedDate.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))
        ) : (
          <option disabled>No reservations available</option>
        )}
      </select>
    </Main>
  );
};

export default Test;
