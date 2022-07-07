import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Post from './Post';
import CreateComment from '../comments/CreateComment';
import Comment from '../comments/Comment';


const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({results: [] })

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: post}] = await Promise.all([
                    axiosReq.get(`/posts/${id}`)
                ])
                setPost({results: [post]})
            } catch (err) {
                console.log(err)
            }
        }
        handleMount();
    }, [id])


  return (
    <Row>
        <Col>
            <Post {...post.results[0]} setPosts={setPost} postPage />
            <Container>
                {currentUser ? (
                    <CreateComment
                        profile_id={currentUser.profile_id}
                        profileImage={profile_image}
                        post={id}
                        setPost={setPost}
                        setComments={setComments}
                    />
                ) : comments.results.length ? (
                    "Comments"
                ) : null}
                {comments.results.length ? (
                    comments.results.map((comment) => (
                    <Comment key={comment.id} {...comment}/>
                    ))
                ) : currentUser ? (
                    <span>No comments yet, be the first to comment on this post!</span>
                ) : (
                    <span>No comments... yet!</span>
                )}
            </Container>
        </Col>
    </Row>
  )
}

export default PostPage