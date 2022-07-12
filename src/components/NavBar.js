import React, { useContext} from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';
import NavbarContext from '../context/NavbarContect';


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
            <NavLink to={`/profile/${currentUser?.profile_id}`} activeClassName=''>{currentUser?.username}</NavLink>
            <NavLink exact to="/posts" activeClassName=''>Feed</NavLink>
            <NavLink to="/likes" activeClassName=''>Liked</NavLink>
            <NavLink to="/posts/create" activeClassName=''>Add post</NavLink>
            <NavLink to="/" onClick={handleSignOut}>Sign Out</NavLink>
        </>

    const loggedOutLinks = 
        <>
            <NavLink to="/signin" activeClassName=''>Sign In</NavLink>
            <NavLink to="/signup" activeClassName=''>Sign Up</NavLink>
        </>

    return (
        <div>
            <Navbar expanded={expanded} expand='false' bg="light">
                <Container className='justify-content-center'>
                    <Navbar.Brand>
                        <Link exact to="/" >
                            <h1>WANDERLUST</h1>
                        </Link>
                        <p>Let's dream and get inspired together!</p>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        ref={ref}
                        onClick={() => setExpanded(!expanded)}
                        aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <NavLink exact to="/" activeClassName=''>Home</NavLink>
                        {currentUser ? loggedInLinks : loggedOutLinks}
                        </Nav>
                        <Form 
                            inline ref={ref} 
                            onClick={() => setExpanded(expanded)}
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