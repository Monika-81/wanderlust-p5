import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from '../../context/ProfileContext';

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { pageProfile } = useProfileData();
    const setProfileData = useSetProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;
    const { id} = useParams();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{data: pageProfile}] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`)
                ])
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: {results: [pageProfile]}
                }))
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
            <Row>
                <Col>Profile content</Col>
            </Row>
        </>
    );

    const userProfilePosts = (
        <>
            <hr />
                Profile Posts
                <Col>
                    <div>{profile?.posts_count}</div>
                </Col>
            <hr />
        </>
    );

  return (
    <Row>
        <Col>
            <Container>
                {userProfile}
                {userProfilePosts}
            </Container>
        </Col>
    </Row>
  );
}

export default ProfilePage;