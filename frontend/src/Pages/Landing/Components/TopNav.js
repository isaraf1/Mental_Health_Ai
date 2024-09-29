import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Translate from '../../Translate';
export default function TopNav() {
  const [isLoggedIn,setisLoggedIn]=useState(false);
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" sticky="top" >
      <Container style={{ marginLeft:'1rem' }}>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="http://127.0.0.1:5000/">Chat</Nav.Link> */}
            <Nav.Link href="interview">Take An Interview</Nav.Link>
            <Nav.Link href="questionnaire">Seek Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button variant="primary" style={{marginRight:"1rem"}} ><a href="/login" style={{color:"white"}}>Log In</a></Button>
      <Translate/>
    </Navbar>
    </div>
  )
}
