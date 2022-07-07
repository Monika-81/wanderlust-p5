import React from 'react'
import { Card, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { DotDropdown } from "../../components/DotDropdown";
import { axiosRes } from '../../api/axiosDefaults';

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

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Card className="col-12 col-md-6 col-lg-4">
            <Link to={`/posts/${id}/`} >
                <Card.Img variant="top" src={image} alt={title} height={500} />
            </Link>
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                {subtitle && <Card.Subtitle>{subtitle}</Card.Subtitle>}
                {content && <Card.Text>{content}</Card.Text>}
            </Card.Body>
            <Card.Footer>
                <span>{owner}</span>
                <span>{updated_at}</span>
                {is_owner && postPage && (
                    <DotDropdown
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                )}
            </Card.Footer>
        </Card>
    )
}

export default Post;