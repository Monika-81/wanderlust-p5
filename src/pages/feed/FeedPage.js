import React, { useEffect, useState } from 'react'
import {Col, Container, Form, Row} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { fetchMoreData } from '../../utils/utils';
import Post from './Post';

function FeedPage({message, filter = ''}) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false)
        const timer = setTimeout(() => {
            fetchPosts()
        }, 1000);  
        return () => {
            clearTimeout(timer)
        }      
    }, [filter, query, pathname])


    return (
        <Row>
            <Col>
            {hasLoaded ? (
                <>
                {posts.results.length ? (
                    <InfiniteScroll
                        children={
                            posts.results.map((post) => (
                                <Post key={post.id} {...post} setPosts={setPosts} />
                            ))
                        }
                        dataLength={posts.results.length}
                        hasMore={!!posts.next}
                        next={() => fetchMoreData(posts, setPosts)}
                    />
                ) : ( 
                    <Container>
                        {message}
                    </Container>
                )}
                </>
            ) : (
                console.log('loading spinner')
            )}

            </Col>
        </Row>
    )
}

export default FeedPage