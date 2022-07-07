import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Post from './Post';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({results: [] })

    const currentUser = useCurrentUser();

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
            <Post />
        </Col>
    </Row>
  )
}

export default PostPage