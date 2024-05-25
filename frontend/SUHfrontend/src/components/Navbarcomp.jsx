import React from "react";

import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import Rezervacije from "./Rezervacije";

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
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/rezervacije">
                Rezervacije
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div>
        <Routes>
          <Route
            path="/rezervacije"
            element={<Rezervacije></Rezervacije>}
          ></Route>

          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
      </div>
    </Router>
  );
}
