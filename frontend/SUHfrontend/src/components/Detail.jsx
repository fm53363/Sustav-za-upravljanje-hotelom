import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Detail({ reservation }) {
  const [reservationRooms, setReservationRooms] = useState(null);

  useEffect(() => {
    const fetchReservationRooms = async () => {
      try {
        const response = await axios.get("/api/rezervacijasoba/getAll");
        const filteredRooms = response.data.filter(
          (room) => room.sifraRezervacije == reservation.sifraRezervacije
        );
        setReservationRooms(filteredRooms);
      } catch (err) {
        console.error("Error fetching rezsoba:", err);
      }
    };

    fetchReservationRooms();
  }, [reservation]);

  return (
    <div>
      <h1>Reservation Details</h1>
      {reservationRooms ? (
        reservationRooms.map((room) => (
          <div key={room.idSoba}>
            <h2>Room ID: {room.idSoba}</h2>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
