import React, { useState} from "react";
import { Form, Button, Col, Row, Container, Alert, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";
import appStyles from "../../App.module.css";
import Signup from '../../assets/signup.jpg'


const SignUpForm = () => {
    useRedirect('loggedIn');

    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });

    const { username, password1, password2 } = signUpData;

    const history = useHistory();

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post('/dj-rest-auth/registration/', signUpData);
          history.push('/signin');
        } catch (err) {
          setErrors(err.response?.data);
        }
    };

    return (
        <Row className={appStyles.RowMargin}>
            <Col className={appStyles.ColImage}>
                <Image className={appStyles.FormImage} src={Signup}/>       
            </Col>
            <Col className={appStyles.ColForm}>
                <Container>
                    <h1 className={appStyles.FormHeader}>Sign up!</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username" className={appStyles.FormGroup}>
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Username*" 
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
                       <Form.Group controlId="password1" className={appStyles.FormGroup}>
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password*" 
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
                        <Form.Group controlId="password2" className={appStyles.FormGroup}>
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password*" 
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
                        <Button variant="info" type="submit" className={appStyles.FormButton}>
                            Register
                        </Button>
                        <Link to="/signin">
                            <p>Or Sign in!</p>
                        </Link>
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