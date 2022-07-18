import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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
            // console.log(err);
        }
    };

    const loggedInLinks = 
        <>
            <NavLink 
                exact to="/posts" 
                activeClassName={styles.Active}
                className={`${styles.NavLink} ${styles.NavbarText}`}
            >
                Feed
            </NavLink>
            <NavLink 
                to="/likes" 
                activeClassName={styles.Active}
                className={`${styles.NavLink} ${styles.NavbarText}`}
            >
                Liked
            </NavLink>
            <NavLink 
                to={`/profile/${currentUser?.profile_id}`} 
                activeClassName={styles.Active}
                className={`${styles.NavLink} ${styles.NavbarText}`}
            >
                Profile
            </NavLink>
            <NavLink 
                to="/posts/create" 
                activeClassName={styles.Active}
                className={`${styles.NavLink} ${styles.NavbarText}`}
            >
                Add post
            </NavLink>
            <NavLink 
                to="/" 
                onClick={handleSignOut}
                className={`${styles.NavLink} ${styles.NavbarText}`}
            >
                Sign Out
            </NavLink>
        </>

    const loggedOutLinks = 
        <>
            <NavLink 
                to="/signin" 
                activeClassName={styles.Active}
                className={`${styles.NavLink} ${styles.NavbarText}`}
            >
                Sign In
            </NavLink>
            <NavLink 
                to="/signup" 
                activeClassName={styles.Active}
                className={`${styles.NavLink} ${styles.NavbarText}`}
            >
                Sign Up
            </NavLink>
        </>

    return (
        <div>
            <Navbar expand='true' className={styles.NavbarImage} fetchpriority="high">
                <Container className='justify-content-center' >
                    <Navbar>
                        <NavLink exact to="/" className={`${styles.NavLink} ${styles.Hover} ${styles.TextWhite}`} >
                            <h1 className={styles.Logo}>WANDERLUST</h1>
                            <p className={styles.NavbarText}>Let's dream and get inspired together!</p>
                        </NavLink>
                    </Navbar>
                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav" 
                    />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto flex-row flex-wrap justify-content-center">
                            <NavLink 
                                exact to="/" 
                                activeClassName={styles.Active}
                                className={`${styles.NavLink} ${styles.NavbarText}`}
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