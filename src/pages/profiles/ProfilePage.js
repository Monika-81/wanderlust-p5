import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === profile?.owner;
    const { id} = useParams();
    // const { pageProfile } = useProfileData();
    // const [profile] = pageProfile.results;
    // const setProfileData = useSetProfileData();
    

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

    const profile = (
        <>
            <Row>
                <Col>
                    PICTURE column            
                </Col>
                <Col>
                    <h3>Profile username</h3>
                    <p>Profile stats</p>
                    <p>Follow button</p>
                </Col>
            </Row>
            <Row>
                <Col>Profile content</Col>
            </Row>
        </>
    );

    const profilePosts = (
        <>
            <hr />
                Profile Posts
            <hr />
        </>
    );

  return (
    <Row>
        <Col>
            <Container>
                {profile}
                {profilePosts}
            </Container>
        </Col>
    </Row>
  );
}

export default ProfilePage;