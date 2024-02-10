import styled from "@emotion/styled";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";

const GridHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #e5ecf6;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.4rem;
`;
const GridBody = styled(GridHeader)`
  &:nth-of-type(even) {
    background-color: #e5ecf6;
  }

  &:nth-of-type(odd) {
    background-color: #e3f5ff;
  }
`;

const Reservations = () => {
  const [reservationData, setReservationData] = useState([]);

  useEffect(() => {
    const getReservationData = async () => {
      try {
        const usersWithReservationsQuery = query(
          collection(db, "users"),
          where("reservationDetails", "!=", null)
        );

        const unsubscribe = onSnapshot(
          usersWithReservationsQuery,
          (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setReservationData(data);
          }
        );
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching reservation data", error);
      }
    };
    getReservationData();
  }, []);

  return (
    <section>
      <GridHeader>
        <h5>Name</h5>
        <h5>Date</h5>
        <h5>Time</h5>
        <h5>Occasion</h5>
        <h5>Guests</h5>
      </GridHeader>
      {reservationData.map((user) => (
        <GridBody key={user.id}>
          <p>{user.name}</p>
          {user?.reservationDetails?.map((reservation, index) => (
            <React.Fragment key={index}>
              <p>{reservation.date}</p>
              <p>{reservation.time}</p>
              <p>{reservation.occasion}</p>
              <p>{reservation.guests}</p>
            </React.Fragment>
          ))}
        </GridBody>
      ))}
    </section>
  );
};

export default Reservations;
