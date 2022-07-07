import React from 'react'
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../context/CurrentUserContext';

const Post = (props) => {
    const {
        id,
        owner,
        title,
        subtitle,
        content,
        image,
        updated_at,
        profile_id,
        profile_image,
        postPage,
        setPosts
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();


  return (
    <Card>
        <Link to={`/posts/${id}`} >
            <Card.Img variant="top" src={image} alt={title} />
        </Link>
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Post;