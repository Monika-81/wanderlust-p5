import React, { useState } from 'react'
import { Col, Row, Container, Form, Button, Image } from 'react-bootstrap'

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: '',
    subtitle: '',
    content: '',
    image: '',
  })

  const {title, subtitle, content, image} = postData

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    })
  }

  const handleImageChange = (event) => {
    if (event.target.files.length){
      URL.revokeObjectURL(image)
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0])
      })
    }
  }

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
                <Form>
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
                      <Form.Group controlId="image">
                        <Form.Label 
                          htmlFor="image-upload"
                          src=''
                          message="Click to upload image">Upload Image
                        </Form.Label>
                        <Form.File
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Form.Group>
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