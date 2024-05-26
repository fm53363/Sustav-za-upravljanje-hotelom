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

  const [editedReservation, setEditedReservation] = useState({
    sifraRezervacije: "",
    datumDolaska: "",
    datumOdlaska: "",
    idGost: "",
  });

  const [errors, setErrors] = useState({
    datumDolaska: "",
    datumOdlaska: "",
  });

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

  const validateDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(date);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedReservation((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (!validateDate(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Datum mora biti u formatu YYYY-MM-DD",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSaveReservation = async () => {
    const { datumDolaska, datumOdlaska } = editedReservation;
    if (!validateDate(datumDolaska) || !validateDate(datumOdlaska)) {
      alert("Datum mora biti u formatu YYYY-MM-DD");
      return;
    }

    try {
      const response = await axios.put(
        `/api/rezervacija/${editedReservation.sifraRezervacije}`,
        editedReservation
      );
      const updatedReservation = response.data;
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.sifraRezervacije === updatedReservation.sifraRezervacije
            ? updatedReservation
            : reservation
        )
      );
      alert("Rezervacija uspješno spremljena.");
    } catch (error) {
      console.error("Error saving reservation:", error);
      alert("Greška prilikom spremanja rezervacije.");
    }
  };

  const handleDeleteReservation = async () => {
    try {
      await axios.delete(
        `/api/rezervacija/${editedReservation.sifraRezervacije}`
      );
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) =>
            reservation.sifraRezervacije !== editedReservation.sifraRezervacije
        )
      );
      setCurrentReservationIndex(0); // Optionally, reset the index
      alert("Rezervacija uspješno obrisana.");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      alert("Greška prilikom brisanja rezervacije.");
    }
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

  useEffect(() => {
    if (guestReservations.length > 0) {
      setEditedReservation(guestReservations[currentReservationIndex]);
    }
  }, [currentReservationIndex, guestReservations]);

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
            {currentReservation && (
              <div>
                <Row>
                  <Col>
                    <ButtonGroup>
                      <Button
                        variant="primary"
                        onClick={handlePreviousReservation}
                      >
                        Prethodna
                      </Button>{" "}
                      <Button variant="primary" onClick={handleNextReservation}>
                        Sljedeća
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>
                      Rezervacija {currentReservationIndex + 1} od{" "}
                      {guestReservations.length}
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>
                      Datum Dolaska:
                      <Form.Control
                        type="text"
                        name="datumDolaska"
                        value={editedReservation.datumDolaska}
                        onChange={handleInputChange}
                        isInvalid={!!errors.datumDolaska}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.datumDolaska}
                      </Form.Control.Feedback>
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>
                      Datum Odlaska:
                      <Form.Control
                        type="text"
                        name="datumOdlaska"
                        value={editedReservation.datumOdlaska}
                        onChange={handleInputChange}
                        isInvalid={!!errors.datumOdlaska}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.datumOdlaska}
                      </Form.Control.Feedback>
                    </Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="success" onClick={handleSaveReservation}>
                      Spremi
                    </Button>
                    <Button variant="danger" onClick={handleDeleteReservation}>
                      Obriši
                    </Button>
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
          <hr />
          {currentReservation && <Detail reservation={currentReservation} />}
        </Col>
      </Row>
    </Container>
  );
}
