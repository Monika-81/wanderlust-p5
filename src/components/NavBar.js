import React from 'react'
import { Container, Navbar, NavDropdown, Button, Form, FormControl } from 'react-bootstrap'

const NavBar = () => {
  return (
    <div>
        <Navbar expand="lg" bg="light" >
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
                <NavDropdown alignLeft >
                    <NavDropdown.Item href="#action/3.1">Feed</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Liked</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.3">Sign in!</NavDropdown.Item>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" />
                        <Button>Search</Button>
                    </Form>
                </NavDropdown>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar