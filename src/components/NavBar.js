import React from 'react';
import axios from 'axios';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/utils';
import styles from '../styles/NavBar.module.css'
import SearchBar from './SearchBar';


//Returns navbar with conditional links for logged in users 
//and searchbar component on feed pages
function NavBar() {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const pathname = window.location.pathname;

    const handleSignOut = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/')
            setCurrentUser(null)
            removeTokenTimestamp();
        } catch (err) {
            console.log(err);
        }
    };

    const loggedInLinks = 
        <>
            <NavLink 
                exact to="/posts" 
                activeClassName={styles.Active}
                className={styles.NavLink}
            >
                Feed
            </NavLink>
            <NavLink 
                to="/likes" 
                activeClassName={styles.Active}
                className={styles.NavLink}
            >
                Liked
            </NavLink>
            <NavLink 
                to={`/profile/${currentUser?.profile_id}`} 
                activeClassName={styles.Active}
                className={styles.NavLink}
            >
                Profile
            </NavLink>
            <NavLink 
                to="/posts/create" 
                activeClassName={styles.Active}
                className={styles.NavLink}
            >
                Add post
            </NavLink>
            <NavLink 
                to="/" 
                onClick={handleSignOut}
                className={styles.NavLink}
            >
                Sign Out
            </NavLink>
        </>

    const loggedOutLinks = 
        <>
            <NavLink 
                to="/signin" 
                activeClassName={styles.Active}
                className={styles.NavLink}
            >
                Sign In
            </NavLink>
            <NavLink 
                to="/signup" 
                activeClassName={styles.Active}
                className={styles.NavLink}
            >
                Sign Up
            </NavLink>
        </>

    return (
        <div>
            <Navbar expand='true' className={styles.NavbarImage}>
                <Container className='justify-content-center' >
                    <Navbar.Brand>
                        <NavLink exact to="/" className={`${styles.NavLink} ${styles.Hover}`} >
                            <h1 className={styles.Logo}>WANDERLUST</h1>
                            <p>Let's dream and get inspired together!</p>
                        </NavLink>
                        <Navbar.Toggle
                            aria-controls="responsive-navbar-nav" 
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto flex-row flex-wrap justify-content-center">
                            <NavLink 
                                exact to="/" 
                                activeClassName={styles.Active}
                                className={styles.NavLink}
                            >  
                                Home
                            </NavLink>
                            {currentUser ? loggedInLinks : loggedOutLinks}
                        </Nav>
                        <div>
                            {pathname === '/' ? (
                                <SearchBar />
                            ) : pathname === '/posts' ? (
                                <SearchBar />
                            ) : pathname === '/likes' ? (
                                <SearchBar />
                            ) : ( 
                                null
                            )}
                        </div>                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;