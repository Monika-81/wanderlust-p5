import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Post from './Post';
import CreateComment from '../comments/CreateComment';
import Comment from '../comments/Comment';
import appStyles from "../../App.module.css";


//Renders a post and it's comments
const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({results: [] })

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: post}, {data: comments}] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`comments/?post=${id}`)
                ]);
                setPost({results: [post]})
                setComments(comments)
            } catch (err) {
                console.log(err);
            }
        }
        handleMount();
    }, [id])


  return (
    <Row className={appStyles.RowMargin}>
        <Col>
            <Post {...post.results[0]} setPosts={setPost} postPage />
            <Row className='flex-column justify-center'>
                {currentUser ? (
                    <CreateComment
                        profile_id={currentUser.profile_id}
                        profileImage={profile_image}
                        post={id}
                        setPost={setPost}
                        setComments={setComments}
                    />
                ) : comments.results.length ? (
                    <p>"Comments"</p>
                ) : null}
                {comments.results.length ? (
                    comments.results.map((comment) => (
                    <Comment key={comment.id} {...comment}
                    setPost={setPost}
                    setComments={setComments}
                    />
                    ))
                ) : currentUser ? (
                    <span>No comments yet, be the first to comment on this post!</span>
                ) : (
                    <span>No comments... yet!</span>
                )}
            </Row>
        </Col>
    </Row>
  )
}

export default PostPage