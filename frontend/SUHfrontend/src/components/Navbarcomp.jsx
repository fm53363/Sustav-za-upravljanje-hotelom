import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Rezervacije from "./Rezervacije";
import Gosti from "./Gosti";

function NotFound() {
  return <h2>Page Not Found</h2>;
}

export default function Navbarcomp() {
  return (
    <Router>
      <div>
        <Navbar bg="primary" data-bs-theme="dark">
          <Navbar.Brand href="#">Sustav za upravljanje hotelom</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/rezervacije">
                Rezervacije
              </Nav.Link>
              <Nav.Link as={Link} to="/gosti">
                Gosti
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div>
        <Routes>
          <Route path="/rezervacije" element={<Rezervacije />} />
          <Route path="/gosti" element={<Gosti />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
