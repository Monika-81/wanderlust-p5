import React from "react";
import {  Form, Button, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignInForm = () => {
    return (
        <Row>
            <Col>
                <Container>
                    <h1>Sign In</h1>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Username" 
                                name="username"/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password" 
                                name="password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign in
                        </Button>
                        <p>Or Register!</p>
                    </Form>
                </Container>
            </Col>
        </Row>
    )
}

export default SignInForm;