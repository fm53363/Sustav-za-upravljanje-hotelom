import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

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

  const handleUpdate = (roomId) => {
    // Handle update logic here
    console.log("Update room with ID:", roomId);
  };

  const handleDelete = (roomId) => {
    // Handle delete logic here
    console.log("Delete room with ID:", roomId);
  };

  const handleInputChange = (e, roomId, fieldName) => {
    const { value } = e.target;
    // Here, you can handle updating the state or performing any other logic based on the changes
    console.log(
      `Change detected in ${fieldName} for room ${roomId}. New value: ${value}`
    );
  };

  return (
    <Container>
      <h1>Detalji rezervacije</h1>
      {reservationRooms ? (
        reservationRooms.map((room) => (
          <div key={room.idSoba}>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId={`formRoomId_${room.idSoba}`}>
                    <Form.Label>id sobe</Form.Label> {/* Room ID */}
                    <Form.Control type="text" readOnly value={room.idSoba} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formReservationId_${room.idSoba}`}>
                    <Form.Label>Šifra rezervacije</Form.Label>{" "}
                    {/* Reservation ID */}
                    <Form.Control
                      type="text"
                      readOnly
                      value={room.sifraRezervacije}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formCheckIn_${room.idSoba}`}>
                    <Form.Label>Dolazak</Form.Label> {/* Check-In */}
                    <Form.Control
                      type="text"
                      readOnly={false} // Make it editable
                      value={new Date(room.checkIn).toLocaleString()}
                      onChange={(e) =>
                        handleInputChange(e, room.idSoba, "checkIn")
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formCheckOut_${room.idSoba}`}>
                    <Form.Label>Odlazak</Form.Label> {/* Check-Out */}
                    <Form.Control
                      type="text"
                      readOnly={false} // Make it editable
                      value={new Date(room.checkOut).toLocaleString()}
                      onChange={(e) =>
                        handleInputChange(e, room.idSoba, "checkOut")
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
                      readOnly={false} // Make it editable
                      value={room.brojGostiju}
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
                      readOnly={false} // Make it editable
                      value={room.specijalniZahtjevi}
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
                    Uredi {/* Change text to 'Uredi' */}
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
