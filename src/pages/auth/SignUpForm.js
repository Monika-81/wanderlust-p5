import React from "react";
import {  Form, Button, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    return (
        <Row>
            <Col>
            PICTURE column            
            </Col>
            <Col>
                <Container>
                    <h1>Register</h1>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Username" 
                                name="username"/>
                        </Form.Group>
                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password" 
                                name="password1" />
                        </Form.Group>
                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password" 
                                name="password2" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                        <p>Or Sign in!</p>
                    </Form>
                </Container>
            </Col>
        </Row>
    )
}

export default SignUpForm;