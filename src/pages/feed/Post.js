import React from 'react'
import { Col, Image, OverlayTrigger, Tooltip, Row, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { DotDropdown } from "../../components/DotDropdown";
import { axiosRes } from '../../api/axiosDefaults';
import appStyles from "../../App.module.css";
import styles from '../../styles/Post.module.css'


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
        if (window.confirm("Do you really want to delete this post?")) {
            try {
                await axiosRes.delete(`/posts/${id}/`);
                history.goBack();
            } catch (err) {
                console.log(err)
            }
        } else {
            history.goBack()
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
        <Row>
            <Col className={appStyles.ColForm}>
                <Row className="flew-row flex-wrap">
                    <Col className={styles.ColFlex}>
                        <hr />
                        {title && subtitle && (
                            <h1 className={styles.Title}>{title}: {subtitle}</h1>
                        )}
                        <hr />
                        <p className={styles.Date}>{updated_at}</p>
                    </Col>
                    <Col className={styles.ColFlex}>
                        <Link to={`/posts/${id}/`}>
                            <Image
                            variant="top"
                            src={image}
                            alt={title}
                            fluid
                            />
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container>
                            {content && (
                            <p className={appStyles.ContentColumns}>{content}</p>
                            )}
                        </Container>
                    </Col>
                </Row>
                <Row className={styles.PostFooter}>
                    <Col className={styles.ColFlexFooter}>
                        <span className={styles.Author}>/ {owner}</span>
                    </Col>
                    <Col className={styles.ColFlexFooter}>
                        <Link to={`/profile/${profile_id}`}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>{owner}</Tooltip>}
                            >
                                <Image
                                    src={profile_image}
                                    className={appStyles.SmallAvatar}
                                />
                            </OverlayTrigger>
                        </Link>
                        {is_owner ? (
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>You can't like your own post!</Tooltip>}
                            >
                                <i className="fa fa-plane-departure m-4" />
                            </OverlayTrigger>
                        ) : like_id ? (
                            <span onClick={handleUnlike}>
                                <i className="fa fa-plane-departure m-4" />
                            </span>
                        ) : currentUser ? (
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Click to like this post!</Tooltip>}
                            >
                                <span onClick={handleLike}>
                                    <i className="fa fa-plane-departure m-4" />
                                </span>
                            </OverlayTrigger>
                        ) : (
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Log in to like posts!</Tooltip>}
                            >
                                <i className="fa fa-plane-departure m-4" />
                            </OverlayTrigger>
                        )}
                        {likes_count}
                        <Link to={`/posts/${id}`}>
                            <i className="far fa-comments m-4" />
                        </Link>
                        {comments_count}
                        {is_owner && postPage && (
                            <DotDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Post;