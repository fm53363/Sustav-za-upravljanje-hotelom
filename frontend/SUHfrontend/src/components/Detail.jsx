import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Detail({ reservation }) {
  const [reservationRooms, setReservationRooms] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });
  const [modifiedRooms, setModifiedRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState(null);
  const [newRoom, setNewRoom] = useState({
    idSoba: "",
    cijenaNoci: "",
    brojGostiju: "",
    specijalniZahtjevi: "",
  });

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

    const fetchAvailableReservations = async () => {
      try {
        const response = await axios.get(
          `/api/rezervacija/sobe/${reservation.sifraRezervacije}`
        );
        setAvailableRooms(response.data);
      } catch (err) {
        console.error("Error fetching rezsoba:", err);
      }
    };

    const fetchAll = async () => {
      await fetchReservationRooms();
      await fetchAvailableReservations();
    };

    fetchAll();
  }, [reservation]);

  const handleUpdate = async (roomId) => {
    const updatedRoom = modifiedRooms.find((room) => room.idSoba === roomId);
    if (updatedRoom) {
      try {
        await axios.put(
          `/api/rezervacijasoba/${reservation.sifraRezervacije}/${roomId}`,
          updatedRoom
        );
        const updatedRooms = reservationRooms.map((room) =>
          room.idSoba === roomId ? { ...room, ...updatedRoom } : room
        );
        setReservationRooms(updatedRooms);
        setAlert({
          show: true,
          variant: "success",
          message: "Soba je uspješno ažurirana",
        });
      } catch (err) {
        setAlert({
          show: true,
          variant: "danger",
          message: "Pogreška prilikom ažuriranja sobe",
        });
        console.error("Error updating room:", err);
      }
    }
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

  const handleNewRoomChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevNewRoom) => ({ ...prevNewRoom, [name]: value }));
  };

  const handleAddRoom = async () => {
    try {
      const newRoomData = {
        sifraRezervacije: reservation.sifraRezervacije,
        ...newRoom,
      };

      await axios.post(`/api/rezervacijasoba`, newRoomData);

      // Update available rooms after adding a new room
      setAvailableRooms((prevRooms) =>
        prevRooms.filter((room) => room.idSoba !== newRoom.idSoba)
      );

      setReservationRooms((prevRooms) => [...prevRooms, newRoomData]);
      setAlert({
        show: true,
        variant: "success",
        message: "Soba je uspješno dodana",
      });

      setNewRoom({
        idSoba: "",
        cijenaNoci: "",
        brojGostiju: "",
        specijalniZahtjevi: "",
      });
    } catch (err) {
      setAlert({
        show: true,
        variant: "danger",
        message: "Pogreška prilikom dodavanja sobe",
      });
      console.error("Error adding room:", err);
    }
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
                    <Form.Label>idSoba</Form.Label>
                    <Form.Control type="text" disabled value={room.idSoba} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formPrice_${room.idSoba}`}>
                    <Form.Label>Cijena po noći</Form.Label>
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
                    <Form.Label>Broj gostiju</Form.Label>
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
                    <Form.Label>Specijalni zahtjevi</Form.Label>
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
                    variant="warning"
                    onClick={() => handleUpdate(room.idSoba)}
                  >
                    Spremi
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(room.idSoba)}
                  >
                    Izbriši
                  </Button>
                </Col>
              </Row>
            </Form>
            <hr></hr>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      {availableRooms && availableRooms.length > 0 ? (
        <>
          <h2>Dodaj novu sobu</h2>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formNewRoomId">
                  <Form.Label>id,tip sobe</Form.Label>
                  <Form.Control
                    as="select"
                    name="idSoba"
                    value={newRoom.idSoba}
                    onChange={handleNewRoomChange}
                  >
                    <option value="">Odaberite sobu</option>
                    {availableRooms.map((room) => (
                      <option key={room.idSoba} value={room.idSoba}>
                        {room.idSoba}  {room.tipSobe}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formNewPrice">
                  <Form.Label>Cijena po noći</Form.Label>
                  <Form.Control
                    type="text"
                    name="cijenaNoci"
                    value={newRoom.cijenaNoci}
                    onChange={handleNewRoomChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formNewGuests">
                  <Form.Label>Broj gostiju</Form.Label>
                  <Form.Control
                    type="text"
                    name="brojGostiju"
                    value={newRoom.brojGostiju}
                    onChange={handleNewRoomChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formNewSpecialRequests">
                  <Form.Label>Specijalni zahtjevi</Form.Label>
                  <Form.Control
                    type="text"
                    name="specijalniZahtjevi"
                    value={newRoom.specijalniZahtjevi}
                    onChange={handleNewRoomChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="success" onClick={handleAddRoom}>
                  Dodaj
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <p>nema slobodnih soba za termin boravka</p>
      )}
    </Container>
  );
}
