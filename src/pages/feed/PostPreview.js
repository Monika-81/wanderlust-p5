import React from 'react'
import { Card, Image, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import appStyles from "../../App.module.css";


const PostPreview = (props) => {
    const {
        id,
        owner,
        title,
        subtitle,
        image,
        updated_at,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        setPosts
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

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
                <Card.Img variant="top" src={image} alt={title} className={appStyles.CardImage} />
            </Link>
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                {subtitle && <Card.Subtitle>{subtitle}</Card.Subtitle>}                
                <div>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own post!</Tooltip>}
                        >
                            <i className="fa fa-plane-departure"></i>
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className="fa fa-plane-departure" />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className="fa fa-plane-departure" />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}
                        >
                            <i className="fa fa-plane-departure" />
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
                <Media>
                    <Link to={`/profile/${profile_id}`}>
                        <Image src={profile_image} height={60} width={60} rounded/>
                    </Link>
                    <span>{owner}</span>
                    <span>{updated_at}</span>
                </Media>
            </Card.Footer>
        </Card>
    )
}

export default PostPreview;