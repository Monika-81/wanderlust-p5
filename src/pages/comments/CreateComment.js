import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Comment.module.css";
import appStyles from '../../App.module.css';
import PropTypes from "prop-types";

const CreateComment = (props) => {
  const {
    post, 
    setPost, 
    setComments, 
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
      // console.log(err)
    }
  }


  return (
    <Form onSubmit={handleSubmit} className={styles.Form}>
      <Form.Group>
        <InputGroup className={styles.InputGroup}>
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
      <Button
        disabled={!content.trim()}
        className={appStyles.FormButton} 
        variant="info" 
        type="submit"
      >
        Submit comment
      </Button>
    </Form>
  );
}

//Added proptypes after ESlint testing
CreateComment.propTypes = {
  post: PropTypes.object.isRequired,
  setPost: PropTypes.func.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default CreateComment;