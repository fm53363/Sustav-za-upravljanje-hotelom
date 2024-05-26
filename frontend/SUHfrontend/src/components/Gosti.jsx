import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

export default function Gosti() {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    ime: "",
    prezime: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (id, field, value) => {
    if (field === "email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "Neispravna email adresa",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: null,
      }));
    }
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.idGost === id ? { ...guest, [field]: value } : guest
      )
    );
  };

  const handleUpdateGuest = async (guest) => {
    if (errors[guest.idGost]) {
      alert("Molimo ispravite greške prije ažuriranja gosta.");
      return;
    }
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
    if (field === "email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newGuest: "Neispravna email adresa",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newGuest: null,
      }));
    }
    setNewGuest((prevGuest) => ({
      ...prevGuest,
      [field]: value,
    }));
  };

  const handleCreateGuest = async () => {
    if (errors.newGuest) {
      alert("Molimo ispravite greške prije kreiranja gosta.");
      return;
    }
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
                  {errors[guest.idGost] && (
                    <Form.Text className="text-danger">
                      {errors[guest.idGost]}
                    </Form.Text>
                  )}
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
              {errors.newGuest && (
                <Form.Text className="text-danger">{errors.newGuest}</Form.Text>
              )}
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
