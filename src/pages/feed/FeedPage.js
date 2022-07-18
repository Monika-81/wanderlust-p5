import React, { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CardDeck from "react-bootstrap/CardDeck";
import Row from 'react-bootstrap/Row';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { fetchMoreData } from '../../utils/utils';
import PostPreview from './PostPreview';
import appStyles from "../../App.module.css";
import NavbarContext from '../../context/NavbarContext';
import { useCurrentUser } from "../../contexts/CurrentUserContext";


//Displays posts to user, posts looped over and rendered with
//InfiniteScroll inside a Bootstrap Carddeck
function FeedPage({message, filter = ''}) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const { query } = useContext(NavbarContext);
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                // console.log(err)
            }
        }

        setHasLoaded(false)
            const timer = setTimeout(() => {
                fetchPosts()
            }, 600);  
            return () => {
                clearTimeout(timer)
        }      
    }, [filter, query, pathname, currentUser])


    return (
        <Row className={`${appStyles.RowMargin} ${appStyles.App}`}>
            <Col className='mb-5'>
            {hasLoaded ? (
                <>
                    {posts.results.length ? (
                        <InfiniteScroll
                            style={{ overflow: "unset" }} 
                            dataLength={posts.results.length}
                            hasMore={!!posts.next}
                            next={() => fetchMoreData(posts, setPosts)}
                        >
                            <CardDeck className='justify-content-center'>
                                {posts.results.map((post) => (
                                        <PostPreview key={post.id} {...post} setPosts={setPosts}/>
                                    ))
                                }
                            </CardDeck>
                        </InfiniteScroll>
                    ) : (
                        <Container>
                            {message}
                        </Container>
                    )}
                </>
            ) : (
                null
            )}
            </Col>
        </Row>
    )
}

export default FeedPage