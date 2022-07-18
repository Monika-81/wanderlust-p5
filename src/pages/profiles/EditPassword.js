import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useHistory, useParams } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from "../../context/CurrentUserContext";
import appStyles from "../../App.module.css";
import Editpassword from '../../assets/editpassword.jpg'


const EditPassword = () => {
  const [userData, setUserData] = useState({
    new_password1: '',
    new_password2: '',
  });
  const {new_password1, new_password2} = userData;

  const currentUser = useCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect (() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push('/');
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post('/dj-rest-auth/password/change/', userData);
      history.goBack();
    } catch (err) {
      // console.log(err)
      setErrors(err.response?.data);
    }
  };


  return (
    <Row className={appStyles.RowMargin}>
      <Col className={appStyles.ColImage}>
        <Image className={appStyles.FormImage} src={Editpassword} alt="Image of a pink ballben and a notebook with the eiffel tower on its cover, on a white cloth"/>       
      </Col>
      <Col className={appStyles.ColForm}>
        <Container>
          <h1 className={appStyles.FormHeader}>Edit password</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={appStyles.FormGroup}>
              <Form.Label>New password</Form.Label>
              <Form.Control 
                type='password' 
                name="new_password1"
                value={new_password1}
                onChange={handleChange}
                placeholder="New password"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert variant='warning' key={idx}>{message}</Alert>
              )
            )}
            <Form.Group className={appStyles.FormGroup}>
              <Form.Label>Confirm new password</Form.Label>            
              <Form.Control 
                type='password' 
                name="new_password2"
                value={new_password2}
                onChange={handleChange}
                placeholder="Confirm password"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert variant='warning' key={idx}>{message}</Alert>
              )
            )}
            <Button
              className={appStyles.FormButton} 
              variant="info" 
              type="submit"
            >
              Save changes
            </Button>
            <Button
              className={appStyles.FormButton}
              variant="info" 
              onClick={() => history.goBack()}
            >
              Cancel edit
            </Button>
            
          </Form>
        </Container>
      </Col>
    </Row>
  )
}

export default EditPassword;