import React, { useContext} from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';
import NavbarContext from '../context/NavbarContext';
import styles from '../styles/NavBar.module.css'


function NavBar() {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { query, setQuery } = useContext(NavbarContext);

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

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
                to={`/profile/${currentUser?.profile_id}`} 
                activeClassName={styles.Active}
                className={styles.NavLink}
            >
                {currentUser?.username}
            </NavLink>
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
            <Navbar expanded={expanded} expand='false' bg='white'>
                <Container className='justify-content-center'>
                    <Navbar.Brand>
                        <NavLink exact to="/" className={styles.NavLink} >
                            <h1>WANDERLUST</h1>
                        </NavLink>
                        <p>Let's dream and get inspired together!</p>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        ref={ref}
                        onClick={() => setExpanded(!expanded)}
                        aria-controls="responsive-navbar-nav" />
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
                        <Form 
                            inline ref={ref} 
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <FormControl  
                                type="search" 
                                placeholder="Search posts" 
                                className="mx-auto"
                                id="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;