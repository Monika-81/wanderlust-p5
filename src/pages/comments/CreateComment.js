import React, { useState } from 'react';
import { Form, Image, InputGroup } from 'react-bootstrap';
import { axiosRes } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import styles from "../../styles/Comment.module.css";

const CreateComment = (props) => {
  const {
    post, 
    setPost, 
    setComments, 
    profile_image, 
    profile_id
  } = props;

  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post('/comments/', {
        content, post
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent('');
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Form onSubmit={handleSubmit} className={styles.Form}>
      <Form.Group>
        <InputGroup className={styles.InputGroup}>
          <Link to={`/profiles/${profile_id}`}>
            <Image src={profile_image}/>
          </Link>
          <Form.Control
            placeholder="Add comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={3}
            size="lg"
          />
        </InputGroup>
      </Form.Group>
      <button 
        disabled={!content.trim()}
        type="submit"
        className='m-3'
      >
        Submit comment
      </button>
    </Form>
  );
}

export default CreateComment;