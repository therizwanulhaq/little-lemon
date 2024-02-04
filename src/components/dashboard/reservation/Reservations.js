import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase";
import PopUp from "../../common/PopUp";
import { useAppDataContext } from "../../context/AppDataContext";
import { CustomButton } from "../../common/CustomButton";
import {
  AddIcon,
  AddNewTimesBtn,
  EditIcon,
  ErrorMessage,
  Form,
  GridBody,
  GridHeader,
  Header,
  Input,
  Label,
  Title,
  UploadStatus,
} from "./StyledComponents";
import { Loader } from "../../common/StyledComponents";

const Reservations = () => {
  const [availableTimes, setAvailableTimes] = useState("");
  const [newAvailableTimes, setNewAvailableTimes] = useState("");
  const [date, setDate] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingDish, setDeletingDish] = useState(false);

  const { reservationTimes } = useAppDataContext();

  const sortedReservations = [...reservationTimes].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const resetForm = () => {
    setAvailableTimes("");
    setDate("");
    setNewAvailableTimes("");
    setNewDate("");
    setError(null);
    setUploadStatus(null);
  };

  const togglePopup = (popupType, reservationId = null) => {
    resetForm();
    if (popupType === "add") {
      setIsAddPopupVisible((prevVisibility) => !prevVisibility);
    } else if (popupType === "edit") {
      setIsEditPopupVisible((prevVisibility) => !prevVisibility);
      setEditingReservationId(reservationId);

      if (reservationId) {
        const editingReservation = reservationTimes.find(
          (reservation) => reservation.id === reservationId
        );
        if (editingReservation) {
          setNewAvailableTimes(editingReservation.availableTimes.join(", "));
          setNewDate(editingReservation.date);
        }
      }
    }
  };

  const getFormattedDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Function to get the day of the week
  const getDayOfWeek = (dateString) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const availableTimesArray = availableTimes
        .split(",")
        .map((time) => time.trim());

      // Check for duplicate dates
      const existingReservation = reservationTimes.find(
        (reservation) => reservation.date === date
      );

      if (existingReservation) {
        setError(
          "Reservation for this date already exists. Update existing reservation or handle accordingly."
        );
        setLoading(false);
      } else {
        const availableTimesCollectionRef = collection(db, "reservationTimes");
        await addDoc(availableTimesCollectionRef, {
          date: date,
          availableTimes: availableTimesArray,
        });
        console.log("Data submitted successfully");
        setUploadStatus("Data submitted successfully");
        setLoading(false);
        resetForm();
        togglePopup("add");
      }
    } catch (error) {
      console.error("Error submitting data", error);
      setLoading(false);
    }
  };

  const handleEdit = async (id, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const availableTimesArray = newAvailableTimes
        .split(",")
        .map((time) => time.trim());

      const availableTimesDocRef = doc(db, "reservationTimes", id);
      await updateDoc(availableTimesDocRef, {
        date: newDate,
        availableTimes: availableTimesArray,
      });
      console.log("Data updated successfully");
      setUploadStatus("Data updated successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error updating data", error);
      setLoading(false);
      setError("Error updating data", error);
    }
  };

  const handleDelete = async () => {
    try {
      setDeletingDish(true);
      const reservationDocRef = doc(
        db,
        "reservationTimes",
        editingReservationId
      );
      await deleteDoc(reservationDocRef);
      console.log("Data deleted successfully");
      setDeletingDish(false);
      togglePopup("edit");
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  return (
    <section>
      <Header>
        <h1>Reservations</h1>
        <AddNewTimesBtn onClick={() => togglePopup("add")}>
          Add new times
          <AddIcon className="material-symbols-outlined">more_time</AddIcon>
        </AddNewTimesBtn>
      </Header>

      {/*  Add popup  */}
      <PopUp
        title="Add new reservation times!"
        isVisible={isAddPopupVisible}
        togglePopup={() => togglePopup("add")}
      >
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
          <Label htmlFor="time">Available Times</Label>
          <Input
            id="time"
            type="text"
            placeholder="Enter different times separated by comma (11:30, 12:00 etc)"
            value={availableTimes}
            required
            onChange={(e) => setAvailableTimes(e.target.value)}
          />
          <ErrorMessage>{error}</ErrorMessage>
          <UploadStatus>{uploadStatus}</UploadStatus>
          <CustomButton
            width="100%"
            height="2.5rem"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loader width="1.1rem" height="1.1rem" border="3px solid black" />
            ) : (
              "Submit"
            )}
          </CustomButton>
        </Form>
      </PopUp>

      <GridHeader>
        <Title>
          <b>Date</b>
        </Title>
        <Title>
          <b>Day</b>
        </Title>
        <Title>
          <b>Available Times</b>
        </Title>
        <Title>
          <b>Edit</b>
        </Title>
      </GridHeader>
      {sortedReservations.map((reservation) => (
        <GridBody key={reservation.id}>
          <Title>{getFormattedDate(reservation.date)}</Title>
          <Title>{getDayOfWeek(reservation.date)}</Title>
          <div>
            {reservation.availableTimes.map((times, index) => (
              <Title key={index}>{times}</Title>
            ))}
          </div>
          <EditIcon
            className="material-symbols-outlined"
            onClick={() => togglePopup("edit", reservation.id)}
          >
            edit_square
          </EditIcon>
        </GridBody>
      ))}

      {/*  Edit popup  */}
      <PopUp
        title="Edit reservation times!"
        isVisible={isEditPopupVisible}
        togglePopup={() => togglePopup("edit")}
      >
        <Form onSubmit={(e) => handleEdit(editingReservationId, e)}>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={newDate}
            required
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Label htmlFor="time">Available Times</Label>
          <Input
            id="time"
            type="text"
            value={newAvailableTimes}
            required
            onChange={(e) => setNewAvailableTimes(e.target.value)}
          />
          <ErrorMessage>{error}</ErrorMessage>
          <UploadStatus>{uploadStatus}</UploadStatus>
          <div style={{ display: "flex", gap: "1rem" }}>
            <CustomButton
              type="button"
              width="100%"
              height="2.5rem"
              onClick={handleDelete}
            >
              {deletingDish ? (
                <Loader
                  width="1.1rem"
                  height="1.1rem"
                  border="3px solid black"
                />
              ) : (
                "Delete"
              )}
            </CustomButton>
            <CustomButton
              width="100%"
              height="2.5rem"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader
                  width="1.1rem"
                  height="1.1rem"
                  border="3px solid black"
                />
              ) : (
                "Update"
              )}
            </CustomButton>
          </div>
        </Form>
      </PopUp>
    </section>
  );
};

export default Reservations;
