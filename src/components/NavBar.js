import React from 'react'
import axios from 'axios'
import { Container, Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext'
import useClickOutsideToggle from '../hooks/useClickOutsideToggle'
import { removeTokenTimestamp } from '../utils/utils'

function NavBar() {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/')
            setCurrentUser(null)
            removeTokenTimestamp();
        } catch (err) {
            console.log(err)
        }
    }

    const loggedInLinks = 
        <>
            <NavLink to={`/profile/${currentUser?.profile_id}`} activeClassName=''>{currentUser?.username}</NavLink>
            <NavLink exact to="/posts" activeClassName=''>Feed</NavLink>
            <NavLink to="/liked" activeClassName=''>Liked</NavLink>
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
                        <img
                            alt=""
                            src=""
                            width=""
                            height=""
                            className="d-inline-block align-top" />
                        <h1>WANDERLUST</h1>
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
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar