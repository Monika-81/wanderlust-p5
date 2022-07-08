import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Image, Row, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from "../../context/CurrentUserContext";

const EditProfile = () => {
    const currentUser = useSetCurrentUser();
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
    <div>EditProfile</div>
  )
}

export default EditProfile