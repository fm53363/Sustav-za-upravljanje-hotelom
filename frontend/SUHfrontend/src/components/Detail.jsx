import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

export default function Detail({ reservation }) {
  const [reservationRooms, setReservationRooms] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });
  const [modifiedRooms, setModifiedRooms] = useState([]);

  useEffect(() => {
    const fetchReservationRooms = async () => {
      try {
        const response = await axios.get("/api/rezervacijasoba/getAll");
        const filteredRooms = response.data.filter(
          (room) => room.sifraRezervacije === reservation.sifraRezervacije
        );
        setReservationRooms(filteredRooms);
      } catch (err) {
        console.error("Error fetching rezsoba:", err);
      }
    };

    fetchReservationRooms();
  }, [reservation]);

  const handleUpdate = (roomId) => {
    const updatedRooms = reservationRooms.map((room) =>
      room.idSoba === roomId
        ? modifiedRooms.find((r) => r.idSoba === roomId) || room
        : room
    );
    setReservationRooms(updatedRooms);
    setAlert({
      show: true,
      variant: "success",
      message: "Promjene su spremljene lokalno.",
    });
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(
        `/api/rezervacijasoba/${reservation.sifraRezervacije}/${roomId}`
      );
      setReservationRooms((prevRooms) =>
        prevRooms.filter((room) => room.idSoba !== roomId)
      );
      setAlert({
        show: true,
        variant: "success",
        message: "Soba je uspješno izbrisana",
      });
    } catch (err) {
      setAlert({
        show: true,
        variant: "danger",
        message: "Pogreška prilikom brisanja sobe",
      });
      console.error("Error deleting room:", err);
    }
  };

  const handleInputChange = (e, roomId, fieldName) => {
    const { value } = e.target;
    const updatedRoom = { idSoba: roomId, [fieldName]: value };
    setModifiedRooms((prevModifiedRooms) =>
      prevModifiedRooms.some((room) => room.idSoba === roomId)
        ? prevModifiedRooms.map((room) =>
            room.idSoba === roomId ? updatedRoom : room
          )
        : [...prevModifiedRooms, updatedRoom]
    );
  };

  return (
    <Container>
      <h1>Detalji rezervacije</h1>
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
      {reservationRooms ? (
        reservationRooms.map((room) => (
          <div key={room.idSoba}>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId={`formRoomId_${room.idSoba}`}>
                    <Form.Label>id sobe</Form.Label> {/* Room ID */}
                    <Form.Control type="text" disabled value={room.idSoba} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formReservationId_${room.idSoba}`}>
                    <Form.Label>Šifra rezervacije</Form.Label>{" "}
                    {/* Reservation ID */}
                    <Form.Control
                      type="text"
                      disabled
                      value={room.sifraRezervacije}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formPrice_${room.idSoba}`}>
                    <Form.Label>Cijena po noći</Form.Label>{" "}
                    {/* Price per night */}
                    <Form.Control
                      type="text"
                      value={
                        modifiedRooms.find((r) => r.idSoba === room.idSoba)
                          ?.cijenaNoci || room.cijenaNoci
                      }
                      onChange={(e) =>
                        handleInputChange(e, room.idSoba, "cijenaNoci")
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formGuests_${room.idSoba}`}>
                    <Form.Label>Broj gostiju</Form.Label>{" "}
                    {/* Number of Guests */}
                    <Form.Control
                      type="text"
                      value={
                        modifiedRooms.find((r) => r.idSoba === room.idSoba)
                          ?.brojGostiju || room.brojGostiju
                      }
                      onChange={(e) =>
                        handleInputChange(e, room.idSoba, "brojGostiju")
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formSpecialRequests_${room.idSoba}`}>
                    <Form.Label>Specijalni zahtjevi</Form.Label>{" "}
                    {/* Special Requests */}
                    <Form.Control
                      type="text"
                      value={
                        modifiedRooms.find((r) => r.idSoba === room.idSoba)
                          ?.specijalniZahtjevi || room.specijalniZahtjevi
                      }
                      onChange={(e) =>
                        handleInputChange(e, room.idSoba, "specijalniZahtjevi")
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    variant="warning" // Change variant to 'warning' for yellow color
                    onClick={() => handleUpdate(room.idSoba)}
                  >
                    Spremi {/* Change text to 'Spremi' */}
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(room.idSoba)}
                  >
                    Izbriši {/* Delete */}
                  </Button>
                </Col>
              </Row>
            </Form>

            {reservationRooms.length > 1 && <hr />}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}
