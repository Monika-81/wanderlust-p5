import React from 'react'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
        comments_count,
        likes_count,
        like_id,
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

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                return post.id === id
                    ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                    : post;
                }),
            }));
        } catch (err) {
          console.log(err);
        }
      };
    
      const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                return post.id === id
                    ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                    : post;
                }),
            }));
        } catch (err) {
          console.log(err);
        }
      };


    return (
        <Card>
            <Link to={`/posts/${id}/`} >
                <Card.Img variant="top" src={image} alt={title} height={500} />
            </Link>
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                {subtitle && <Card.Subtitle>{subtitle}</Card.Subtitle>}
                {content && <Card.Text>{content}</Card.Text>}
                
                <div>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own post!</Tooltip>}
                        >
                            <i class="fa fa-plane-departure"></i>
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i class="fa fa-plane-departure" />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i class="fa fa-plane-departure" />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}
                        >
                            <i class="fa fa-plane-departure" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                        <Link to={`/posts/${id}`}>
                            <i className="far fa-comments" />
                        </Link>
                    {comments_count}
                </div>
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