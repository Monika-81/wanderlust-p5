import React, { useRef, useState } from 'react'
import { Col, Row, Container, Form, Button, Image, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from '../../hooks/useRedirect';
import appStyles from "../../App.module.css";
import Default from '../../assets/default.jpg'
import styles from '../../styles/CreateEditPostProfile.module.css'


const CreatePost = () => {
  useRedirect('loggedOut')

  const [postData, setPostData] = useState({
    title: '',
    subtitle: '',
    content: '',
    image: '',
  })

  const {title, subtitle, content, image} = postData

  const imageInput = useRef(null)
  const history = useHistory()
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    })
  }

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Row className={appStyles.RowMargin}>
      <Col className={styles.PostColImage}>
        {image ? (
          <>
            <Image 
              htmlFor="image-upload" 
              src={image} 
              className={styles.PostFormImage}
              alt="Image that the user uploaded"
            />
          </>
        ) : (
          <>
            <Image
              htmlFor="image-upload"
              src={Default}
              className={styles.PostFormImage}
              message="Click or tap to upload an image"
              alt="Default image of a pink globe standing on a desk"
            />
          </>
        )}
      </Col>
      <Col className={appStyles.ColForm}>
        <Container>
          <h1 className={appStyles.FormHeader}>Create post</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className={appStyles.FormGroup}>
              <Form.Label className="d-none">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title* (max 30 charaters)"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="subtitle" className={appStyles.FormGroup}>
              <Form.Label className="d-none">Subtitle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a subtitle* (max 60 charaters)"
                name="subtitle"
                value={subtitle}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.subtitle?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="content" className={appStyles.FormGroup}>
              <Form.Label className="d-none">Content</Form.Label>
              <Form.Control
                as="textarea"
                row={6}
                placeholder="Enter content*"
                name="content"
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group className={appStyles.FormGroup}>
              <Form.Label
                htmlFor="image-upload"
                src=""
                message="Click to upload image"
              >
                <p>Upload Image* </p> 
              </Form.Label>
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={appStyles.FormButton}
              variant="info"
              type="submit"
            >
              Create Post
            </Button>
            <Button
              className={appStyles.FormButton}
              variant="info"
              type="submit"
              onClick={() => history.goBack()}
            >
              Cancel Post
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default CreatePost