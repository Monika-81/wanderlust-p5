import React from 'react'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'

const CreatePost = () => {

  return (
      <Row>
          <Col>
          PICTURE preview         
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
                      />
                      </Form.Group>
                      <Form.Group controlId="subtitle">
                        <Form.Label className="d-none">Subtitle</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Enter a subtitle" 
                          name="subtitle"
                        />
                      </Form.Group>
                      <Form.Group controlId="content">
                        <Form.Label className="d-none">Content</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          row={6}
                          placeholder="Enter content" 
                          name="content"
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