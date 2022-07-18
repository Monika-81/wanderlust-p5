import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from '../../context/ProfileContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import PostPreview from '../feed/PostPreview';
import { EditProfileDropdown } from '../../components/DotDropdown';
import appStyles from "../../App.module.css";
import styles from '../../styles/ProfilePage.module.css'


//Returns the profile page of a user and the users post 
function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });

    const currentUser = useCurrentUser();

    const { pageProfile } = useProfileData();
    const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
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
                // console.log(err)
            }
        }
        fetchData();
    }, [id, setProfileData]);

    const userProfile = (
      <>
        <Row className={appStyles.RowMargin}>
          <Col className={styles.ProfileColForm}>
            <Row className={styles.ProfileInfo}>
                <Image src={profile?.image} className={styles.ProfileAvatar} thumbnail alt="The users profile picture" />
            </Row>
            <Row className={styles.ProfileInfo}>
                <h2 className='mr-3'>{profile?.owner}</h2>
                {profile?.is_owner && <EditProfileDropdown id={profile?.id} />}
            </Row>
            <Row className="justify-content-center m-3">
                {profile?.content && (
                    <Row className="px-4 mx-4">{profile.content}</Row>
                )}
            </Row>
            <Row className={styles.ProfileInfo}>
                <Col>
                    <div>{profile?.posts_count}</div>
                    <div>Posts</div>
                </Col>
                <Col>
                    <div>{profile?.followers_count}</div>
                    <div>Followers</div>
                </Col>
                <Col>
                    <div>{profile?.following_count}</div>
                    <div>Following</div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {currentUser &&
                    !is_owner &&
                    (profile?.following_id ? (
                    <Button
                        variant="info"
                        className={appStyles.FormButton}
                        onClick={() => handleUnfollow(profile)}
                    >
                        Unfollow
                    </Button>
                    ) : (
                    <Button
                        variant="info"
                        className={appStyles.FormButton}
                        onClick={() => handleFollow(profile)}
                    >
                        Follow
                    </Button>
                ))}
            </Row>
          </Col>
        </Row>
      </>
    );

    const userProfilePosts = (
        <>
            <Row className={appStyles.RowMargin}>
            {profilePosts.results.length ? (
                <InfiniteScroll
                    style={{ overflow: "unset" }}
                    dataLength={profilePosts.results.length}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                >
                <CardDeck className='justify-content-center'>
                    {profilePosts.results.map((post) => (
                        <PostPreview key={post.id} {...post} setPosts={setProfilePosts}/>
                        ))
                    }
                </CardDeck>
                </InfiniteScroll>
            ) : (
               <Container>
                    No results found, {profile?.owner} hasn't posted anything... yet!
               </Container>
            )}
            </Row>
        </>
    );

  return (
    <Row className={appStyles.RowMargin}>
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