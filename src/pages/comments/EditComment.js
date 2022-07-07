import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';

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
            console.log(err)
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
      <button
        onClick={() => setShowEditComment(false)}
        type="button"
      >
        Cancel edit
      </button>
      <button
        disabled={!content.trim()}
        type="submit"
      >
        Save changes
      </button>
    </Form>
  )
}

export default EditComment;