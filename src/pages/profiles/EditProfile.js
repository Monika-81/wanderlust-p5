import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Image, Row, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from "../../context/CurrentUserContext";
import appStyles from "../../App.module.css";


const EditProfile = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageInput = useRef();
    const [errors, setErrors] = useState({});    

    const [profileData, setProfileData] = useState({
        name: "",
        content: "",
        image: "",
      });

    const { name, content, image } = profileData;

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { name, content, image } = data;
                    setProfileData({ name, content, image });
                } catch (err) {
                    console.log(err);
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };
    
        handleMount();
        }, [currentUser, history, id]);
    
        const handleChange = (event) => {
            setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
            });
         };
    
        const handleSubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append("name", name);
            formData.append("content", content);
        
            if (imageInput?.current?.files[0]) {
                formData.append("image", imageInput?.current?.files[0]);
            }
    
        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
                setCurrentUser((currentUser) => ({
                    ...currentUser,
                    profile_image: data.image,
            }));
            history.goBack();
            } catch (err) {
                console.log(err);
                setErrors(err.response?.data);
            }
         };


  return (
    <Row className={appStyles.RowMargin}>
        <Col className={appStyles.ColImage}>
            {image && (
                <Image htmlFor="image-upload" src={image} rounded className={appStyles.FormImage}/>
                )
            }     
        </Col>
        <Col className={appStyles.ColForm}>
            <Container>
                <h1 className={appStyles.FormHeader}>Edit profile</h1>
                <Form onSubmit={handleSubmit}>
                <Form.Group className={appStyles.FormGroup}>
                    <Form.Label>Profile description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        row={5}
                        name="content"
                        value={content}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.content?.map((message, idx) => (
                    <Alert variant='warning' key={idx}>{message}</Alert>
                    )
                )}
                <Form.Group className={appStyles.FormGroup}>
                    <Form.Label 
                        htmlFor="image-upload"
                        src=''
                        message="Click to upload image">Change profile image
                    </Form.Label>
                    <Form.File
                        id="image-upload"
                        accept="image/*"
                        ref={imageInput}
                        onChange={(event) => {
                            if (event.target.files.length) {
                              setProfileData({
                                ...profileData,
                                image: URL.createObjectURL(event.target.files[0]),
                              });
                            }
                        }}
                    />
                </Form.Group>
                {errors?.image?.map((message, idx) => (
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

export default EditProfile