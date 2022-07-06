import React from 'react'
import { Container, Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <Navbar expand='false' bg="light" >
            <Container className='justify-content-center'>
                <Navbar.Brand>
                <img
                    alt=""
                    src=""
                    width=""
                    height=""
                    className="d-inline-block align-top"
                />
                <h1>WANDERLUST</h1>
                <p>Let's dream and get inspired together!</p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                    <NavLink to="/feed">Feed</NavLink>
                    <NavLink to="/liked">Liked</NavLink>
                    <NavLink to="/add">Add</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/signin">Sign In</NavLink>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar