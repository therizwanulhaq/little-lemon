import { addDoc, collection } from "@firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase";
import PopUp from "../../common/PopUp";

const Reservations = () => {
  const [availableTimes, setAvailableTimes] = useState("");
  const [date, setDate] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleSubmit = async () => {
    try {
      const availableTimesArray = availableTimes
        .split(",")
        .map((time) => time.trim());

      const availableTimesRef = collection(db, "reservationTimes");
      await addDoc(availableTimesRef, {
        date: date,
        availableTimes: availableTimesArray,
      });
      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <section>
      <h1>Reservations</h1>
      <h4>Available times</h4>
      <button onClick={togglePopup}>Add new times</button>
      <PopUp
        title="Add new times!"
        isVisible={isPopupVisible}
        togglePopup={togglePopup}
      >
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="time">Available Times</label>
        <input
          id="time"
          type="text"
          value={availableTimes}
          onChange={(e) => setAvailableTimes(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </PopUp>
    </section>
  );
};

export default Reservations;
