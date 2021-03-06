import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosRes } from '../../api/axiosDefaults';
import appStyles from '../../App.module.css';
import PropTypes from "prop-types";

function EditComment(props) {
    const { 
        id, 
        content, 
        setComments, 
        setShowEditComment
    } = props;

    const [editComment, setEditComment] = useState(content);
    
    const handleChange = (event) => {
        setEditComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}/`, {
                content: editComment.trim(),
        });
        setComments((prevComments) => ({
            ...prevComments,
            results: prevComments.results.map((comment) => {
                return comment.id === id
                ? {
                    ...comment,
                    content: editComment.trim(),
                    updated_at: 'now',
                }
                : comment;
            }),
        }));
        setShowEditComment(false);
        } catch (err) {
            // console.log(err)
        }
    }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
            as="textarea"
            value={editComment}
            onChange={handleChange}
            rows={3}
          />
      </Form.Group>
      <Button
        className={appStyles.FormButton}
        variant="info"
        disabled={!content.trim()}
        type="submit"
      >
        Save changes
      </Button>
      <Button
        onClick={() => setShowEditComment(false)}
        className={appStyles.FormButton} 
        variant="info" 
      >
        Cancel edit
      </Button>
    </Form>
  )
}

//Added proptypes after ESlint testing
EditComment.propTypes = {
  id: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  setShowEditComment: PropTypes.object.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default EditComment;