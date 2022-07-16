import React, { useState } from "react";
import {  Form, Button, Col, Row, Container, Alert, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";
import { useRedirect } from "../../hooks/useRedirect";
import appStyles from "../../App.module.css";
import Signup from '../../assets/signup.jpg'


const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser();
    useRedirect('loggedIn');

    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = signInData;
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user)
            setTokenTimestamp(data)
            history.push('/');
        } catch (err) {
            setErrors(err.response?.data);
            console.log(err.response?.data)
        }
    };

    return (
        <Row className={appStyles.RowMargin}>
            <Col className={appStyles.ColImage}>
                <Image className={appStyles.FormImage} fluid src={Signup}/>       
            </Col>
            <Col className={appStyles.ColForm}>
                <Container>
                    <h1 className={appStyles.FormHeader}>Sign In</h1>
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
                            <Alert variant='warning' key={idx}>{message}</Alert>
                            )
                        )}
                        <Form.Group controlId="password" className={appStyles.FormGroup}>
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password*" 
                                name="password"
                                value={password} 
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password?.map((message, idx) => (
                            <Alert variant='warning' key={idx}>{message}</Alert>
                            )
                        )}
                        <Button variant="info" type="submit" className={appStyles.FormButton}>
                            Sign in
                        </Button>
                        <Link to="/signup">
                            <p>Or Register!</p>
                        </Link>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert variant='warning' key={idx}>{message}</Alert>
                            )
                        )}
                    </Form>
                </Container>
            </Col>
        </Row>
    )
}

export default SignInForm;