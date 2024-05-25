import React, { useEffect, useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Detail from "./Detail"; // Importing the Detail component

export default function Master() {
  const [reservations, setReservations] = useState(null);
  const [guests, setGuests] = useState(null);

  // save id of selced guest
  const [selectedGuest, setSelectedGuest] = useState("");
  const [guestReservations, setGuestReservations] = useState([]);

  const handleGuestChange = (event) => {
    setSelectedGuest(event.target.value);
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/api/rezervacija/getAll");
        return response.data;
      } catch (error) {
        console.error("Error fetching reservations:", err);
      }
    };

    const fetchGuests = async () => {
      try {
        const response = await axios.get("/api/gost/getAll");

        return response.data;
      } catch (err) {
        console.error("Error fetching guests:", err);
      }
    };

    const fetchAll = async () => {
      const tempReservations = await fetchReservations();
      const tempGuests = await fetchGuests();
      setReservations(tempReservations);
      setGuests(tempGuests);
    };

    fetchAll();
  }, []);

  useEffect(() => {
    // Filter reservations based on selected guest ID
    if (selectedGuest && reservations) {
      const filteredReservations = reservations.filter(
        (reservation) => reservation.idGost === parseInt(selectedGuest)
      );
      setGuestReservations(filteredReservations);
    } else {
      setGuestReservations([]);
    }
  }, [selectedGuest, reservations]);

  console.log(guests);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          {guests && (
            <Form>
              <Form.Label>Gost</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={selectedGuest}
                onChange={handleGuestChange}
              >
                {guests.map((guest) => (
                  <option key={guest.idGost} value={guest.idGost}>
                    {guest.ime + " " + guest.prezime}
                  </option>
                ))}
              </Form.Select>
            </Form>
          )}
        </Col>
        <Col></Col>
        <Col></Col>

        <Col></Col>
      </Row>

      <Row>
        <Col></Col>

        <Col>
          <h3>Reservations for Selected Guest:</h3>
          <ul>
            {guestReservations.map((reservation) => (
              <li key={reservation.sifraRezervacije}>
                {`Reservation ID: ${reservation.sifraRezervacije}, Arrival: ${reservation.datumDolaska}, Departure: ${reservation.datumOdlaska}`}
              </li>
            ))}
          </ul>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        {/* Rendering the Detail component with the reservation prop */}
        <Col>
          {guestReservations.length > 0 && (
            <Detail reservation={guestReservations[0]} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
