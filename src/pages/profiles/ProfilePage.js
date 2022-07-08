import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, Button, CardDeck } from 'react-bootstrap';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from '../../context/ProfileContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import Post from '../feed/Post';
import { EditProfileDropdown } from '../../components/DotDropdown'


function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });

    const currentUser = useCurrentUser();

    const { pageProfile } = useProfileData();
    const setProfileData = useSetProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    const { id} = useParams();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{data: pageProfile}, {data: profilePosts}] = 
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/posts/?owner__profile=${id}`)
                    ])
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: {results: [pageProfile]}
                }));
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) { 
                console.log(err)
            }
        }
        fetchData();
    }, [id, setProfileData]);

    const userProfile = (
        <>
            <Row>
                <Col>
                <Image
                    roundedCircle
                    src={profile?.image}
                />
                </Col>
                <Col>
                    <h3>{profile?.owner}</h3>
                    {profile?.is_owner && <EditProfileDropdown id={profile?.id} />}
                    <p>Profile description</p>
                    <Row>
                        <Col>
                            <div>{profile?.followers_count}</div>
                            <div>followers</div>
                        </Col>
                        <Col>
                            <div>{profile?.following_count}</div>
                            <div>following</div>
                        </Col>
                    </Row>
                    <p>Follow button</p>
                </Col>
            </Row>
        </>
    );

    const userProfilePosts = (
        <>
            <hr />
                <p>{profile?.owner}'s posts</p>
                <Col>
                    <div>{profile?.posts_count}</div>
                </Col>
            <hr />
            {profilePosts.results.length ? (
                <InfiniteScroll
                    style={{ overflow: "unset" }}
                    dataLength={profilePosts.results.length}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                >
                <CardDeck className="col-10">
                    {profilePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setProfilePosts}/>
                        ))
                    }
                </CardDeck>
                </InfiniteScroll>
            ) : (
               <Container>
                    No results found, {profile?.owner} hasn't posted yet
               </Container>
            )}
        </>
    );

  return (
    <Row>
        <Col>
            <Container>
                {hasLoaded ? (
                    <>
                        {userProfile}
                        {userProfilePosts}
                    </>
                ) : (
                    'loading...'
                )}
            </Container>
        </Col>
    </Row>
  );
}

export default ProfilePage;