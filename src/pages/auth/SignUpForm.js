import React, { useState} from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {

    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    })

    const { username, password1, password2 } = signUpData

    const history = useHistory()

    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post('/dj-rest-auth/registration/', signUpData);
          history.push('/signin');
        } catch (err) {
          setErrors(err.response?.data);
        }
    }

    return (
        <Row>
            <Col>
            PICTURE column            
            </Col>
            <Col>
                <Container>
                    <h1>Register</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Username" 
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                       <Form.Group controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Password" 
                                name="password1"
                                value={password1}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password" 
                                name="password2"
                                value={password2}
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                        <p>Or Sign in!</p>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Container>
            </Col>
        </Row>
    )
}

export default SignUpForm;