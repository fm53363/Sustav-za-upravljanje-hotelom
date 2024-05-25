import React, { useEffect, useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Detail from "./Detail"; // Importing the Detail component
import ButtonGroup from "react-bootstrap/ButtonGroup"; // Add this import for ButtonGroup

export default function Master() {
  const [reservations, setReservations] = useState(null);
  const [guests, setGuests] = useState(null);

  const [selectedGuest, setSelectedGuest] = useState(null);
  const [guestReservations, setGuestReservations] = useState([]);
  const [currentReservationIndex, setCurrentReservationIndex] = useState(0);

  const handleGuestChange = (event) => {
    setSelectedGuest(event.target.value);
  };

  const handleNextReservation = () => {
    setCurrentReservationIndex((prevIndex) =>
      prevIndex < guestReservations.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousReservation = () => {
    setCurrentReservationIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/api/rezervacija/getAll");
        return response.data;
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    const fetchGuests = async () => {
      try {
        const response = await axios.get("/api/gost/getAll");
        return response.data;
      } catch (error) {
        console.error("Error fetching guests:", error);
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
    if (guests && guests.length > 0) {
      setSelectedGuest(guests[0].idGost);
    }
  }, [guests]);

  useEffect(() => {
    if (selectedGuest && reservations) {
      const filteredReservations = reservations.filter(
        (reservation) => reservation.idGost === parseInt(selectedGuest)
      );
      setGuestReservations(filteredReservations);
      setCurrentReservationIndex(0); // Reset index when guest changes
    } else {
      setGuestReservations([]);
    }
  }, [selectedGuest, reservations]);

  const currentReservation = guestReservations[currentReservationIndex];

  return (
    <Container>
      <Row className="mb-3 border-bottom">
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
      </Row>

      <Row className="mb-3">
        <Col></Col>
        <Col>
          <div>
            <h3>Reservation:</h3>
            {currentReservation && (
              <div>
                <Row>
                  <Col>
                    <ButtonGroup>
                      <Button
                        variant="primary"
                        onClick={handlePreviousReservation}
                      >
                        Previous
                      </Button>{" "}
                      <Button variant="primary" onClick={handleNextReservation}>
                        Next
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>
                      Reservation ID:
                      <Form.Control
                        type="text"
                        value={currentReservation.sifraRezervacije}
                        disabled
                      />
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>
                      Arrival:
                      <Form.Control
                        type="text"
                        value={currentReservation.datumDolaska}
                        disabled
                      />
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>
                      Departure:
                      <Form.Control
                        type="text"
                        value={currentReservation.datumOdlaska}
                        disabled
                      />
                    </Form.Label>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Col>
        <Col></Col>
      </Row>

      <Row className="mb-3">
        <Col>
          {currentReservation && <Detail reservation={currentReservation} />}
        </Col>
      </Row>
    </Container>
  );
}
