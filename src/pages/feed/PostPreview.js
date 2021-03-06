import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import appStyles from "../../App.module.css";
import styles from '../../styles/PostPreview.module.css';
import PropTypes from "prop-types";


//Post setup as displayed in preview aka feed pages: 'home', 'feed' and 'liked'
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
        //   console.log(err);
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
        //   console.log(err);
        }
      };

    return (
        <Card className={appStyles.CardStyle} >
            <div className={appStyles.CardFlex}>
                <Link to={`/posts/${id}/`}>
                    {title && <span className={appStyles.CardTitle}>{title}</span>}
                </Link>
                <span>{updated_at}</span>
            </div>
            <Card.Body className="p-1">
                <Media className={styles.Media}>
                    <Link to={`/posts/${id}/`}>
                        <Card.Img variant="top" src={image} alt={title} className={styles.Image} />
                    </Link>
                </Media>
                <div>
                    {subtitle && <p>{subtitle}</p>}
                    <Link to={`/profile/${profile_id}`} aria-label="Click to go to the users profile page">
                       / {owner}
                    </Link>
                </div>
            </Card.Body>
            <Card.Footer className={styles.Footer}>
                <div className={appStyles.CardFlex}>
                    <div>
                        <Link to={`/profile/${profile_id}`} aria-label="Click to go to the users profile page">
                            <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>{owner}</Tooltip>}
                            >
                                <Image
                                    src={profile_image}
                                    className={appStyles.SmallAvatar}
                                    alt="The users profile picture"
                                    thumbnail
                                />
                            </OverlayTrigger>
                        </Link>
                        {is_owner ? (
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>You can not like your own post!</Tooltip>}
                            >
                                <i className="fa fa-plane-departure m-3"  />
                            </OverlayTrigger>
                        ) : like_id ? (
                            <span onClick={handleUnlike}>
                                <i className="fa fa-plane-departure m-3"/>
                            </span>
                        ) : currentUser ? (
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Click to like this post!</Tooltip>}
                            >
                                <span onClick={handleLike}>
                                    <i className="fa fa-plane-departure m-3" />
                                </span>
                            </OverlayTrigger>
                        ) : (
                            <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}
                            >
                                <i className="fa fa-plane-departure m-3" />
                            </OverlayTrigger>
                        )}
                        {likes_count}
                        <Link to={`/posts/${id}`} aria-label="Click to go to the post page to read comments">
                            <i className="far fa-comments m-3" />
                        </Link>
                        {comments_count}
                    </div>
                </div>
            </Card.Footer>
        </Card>
    );
}

//Added proptypes after ESlint testing
PostPreview.propTypes = {
    id: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired,
    title: PropTypes.object.isRequired,
    subtitle: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    comments_count: PropTypes.object.isRequired,
    likes_count: PropTypes.object.isRequired,
    like_id: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    profile_id: PropTypes.object.isRequired,
    profile_image: PropTypes.object.isRequired,
    updated_at: PropTypes.object.isRequired,
    postPage: PropTypes.func.isRequired,
    setPosts: PropTypes.func.isRequired,
  };

export default PostPreview;