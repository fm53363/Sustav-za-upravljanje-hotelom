import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Gosti() {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    ime: "",
    prezime: "",
    email: "",
  });

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get("/api/gost/getAll");
        setGuests(response.data);
      } catch (error) {
        console.log("Greška pri dohvaćanju gostiju:", error);
      }
    };

    fetchGuests();
  }, []);

  const handleInputChange = (id, field, value) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.idGost === id ? { ...guest, [field]: value } : guest
      )
    );
  };

  const handleUpdateGuest = async (guest) => {
    try {
      await axios.put(`/api/gost/${guest.idGost}`, guest);
      alert("Gost uspješno ažuriran");
    } catch (error) {
      console.log("Greška pri ažuriranju gosta:", error);
      alert("Greška pri ažuriranju gosta");
    }
  };

  const handleDeleteGuest = async (id) => {
    try {
      await axios.delete(`/api/gost/${id}`);
      setGuests((prevGuests) =>
        prevGuests.filter((guest) => guest.idGost !== id)
      );
      alert("Gost uspješno obrisan");
    } catch (error) {
      console.log("Greška pri brisanju gosta:", error);
      alert("Greška pri brisanju gosta");
    }
  };

  const handleNewGuestChange = (field, value) => {
    setNewGuest((prevGuest) => ({
      ...prevGuest,
      [field]: value,
    }));
  };

  const handleCreateGuest = async () => {
    try {
      const response = await axios.post("/api/gost", newGuest);
      setGuests((prevGuests) => [...prevGuests, response.data]);
      setNewGuest({ ime: "", prezime: "", email: "" });
      alert("Gost uspješno kreiran");
    } catch (error) {
      console.log("Greška pri kreiranju gosta:", error);
      alert(
        `Greška pri kreiranju gosta. Gost s emailom ${newGuest.email} već postoji`
      );
    }
  };

  return (
    <Container>
      {guests.map((guest) => (
        <div key={guest.idGost}>
          <Form>
            <Row className="align-items-center">
              <Col>
                <Form.Group controlId={`formGuestId${guest.idGost}`}>
                  <Form.Label>ID</Form.Label>
                  <Form.Control type="text" value={guest.idGost} disabled />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId={`formGuestFirstName${guest.idGost}`}>
                  <Form.Label>Ime</Form.Label>
                  <Form.Control
                    type="text"
                    value={guest.ime}
                    onChange={(e) =>
                      handleInputChange(guest.idGost, "ime", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId={`formGuestLastName${guest.idGost}`}>
                  <Form.Label>Prezime</Form.Label>
                  <Form.Control
                    type="text"
                    value={guest.prezime}
                    onChange={(e) =>
                      handleInputChange(guest.idGost, "prezime", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId={`formGuestEmail${guest.idGost}`}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={guest.email}
                    onChange={(e) =>
                      handleInputChange(guest.idGost, "email", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleUpdateGuest(guest)}
                >
                  Uredi
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteGuest(guest.idGost)}
                >
                  Obriši
                </Button>
              </Col>
            </Row>
          </Form>
          <hr /> {/* Line after every guest form */}
        </div>
      ))}

      <h3>Kreiraj novog gosta</h3>
      <Form>
        <Row className="align-items-center">
          <Col>
            <Form.Group controlId="formNewGuestFirstName">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                value={newGuest.ime}
                onChange={(e) => handleNewGuestChange("ime", e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formNewGuestLastName">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                value={newGuest.prezime}
                onChange={(e) =>
                  handleNewGuestChange("prezime", e.target.value)
                }
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formNewGuestEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newGuest.email}
                onChange={(e) => handleNewGuestChange("email", e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Button variant="success" onClick={handleCreateGuest}>
              Kreiraj
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
