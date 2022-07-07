import React, { useRef, useState } from 'react'
import { Col, Row, Container, Form, Button, Image, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { axiosReq } from "../../api/axiosDefaults";

const CreatePost = () => {

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
      <Row>
          <Col>
            <figure>
              <Image src={image} rounded />
            </figure>
            <div>
              <Form.Label
                htmlFor="image-upload"
                >
                Change the image
              </Form.Label>
            </div>      
          </Col>
          <Col>
            <Container>
              <h1>Create post</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label className="d-none">Title</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter title" 
                        name="title"
                        value={title}
                        onChange={handleChange}
                      />
                      </Form.Group>
                      {errors?.title?.map((message, idx) => (
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )
                      )}
                      <Form.Group controlId="subtitle">
                        <Form.Label className="d-none">Subtitle</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Enter a subtitle" 
                          name="subtitle"
                          value={subtitle}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      {errors?.subtitle?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                          {message}
                        </Alert>
                        )
                      )}
                      <Form.Group controlId="content">
                        <Form.Label className="d-none">Content</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          row={6}
                          placeholder="Enter content" 
                          name="content"
                          value={content}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      {errors?.content?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                          {message}
                        </Alert>
                        )
                      )}
                      <Form.Group>
                        <Form.Label 
                          htmlFor="image-upload"
                          src=''
                          message="Click to upload image">Upload Image
                        </Form.Label>
                        <Form.File
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={imageInput}
                        />
                      </Form.Group>
                      {errors?.image?.map((message, idx) => (
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )
                      )}
                      <Button variant="primary" type="submit">
                          Create Post
                      </Button>
                  </Form>
              </Container>
          </Col>
      </Row>
  )
}

export default CreatePost