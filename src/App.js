import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import {Route, Switch, useLocation} from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import CreatePost from './pages/feed/CreatePost';
import PostPage from './pages/feed/PostPage';
import EditPost from './pages/feed/EditPost';
import FeedPage from './pages/feed/FeedPage';
import ProfilePage from './pages/profiles/ProfilePage';
import { useCurrentUser } from './context/CurrentUserContext';
import EditProfile from './pages/profiles/EditProfile';
import EditPassword from './pages/profiles/EditPassword';
import styles from './App.module.css'
import NavbarContext from './context/NavbarContext';
import { useEffect, useState } from 'react';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  const [query, setQuery] = useState('');
  const variables = {query, setQuery};

  const location = useLocation();

  useEffect(() => {
    setQuery('')
  }, [location.pathname]);

  return (
    <NavbarContext.Provider value={variables}>
      <div className={styles.App}>
        <NavBar />
        <Container>
          <Switch>
            <Route 
              exact path="/" 
              render={() => (
                <FeedPage 
                  message="No results found. Please adjust search criteria."
                />
              )} 
            />
            <Route 
              exact path="/posts" 
              render={() => (
                <FeedPage 
                  message="No results found. Adjust search criteria or follow more accounts."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              )} 
            />
            <Route 
              exact path="/likes" 
              render={() => (
                <FeedPage 
                  message="No results found. Adjust search criteria or like more posts."
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                />
              )} 
            />
            <Route exact path="/posts/create" render={() => <CreatePost/>} />
            <Route exact path="/posts/:id" render={() => <PostPage/>} />
            <Route exact path="/posts/:id/edit" render={() => <EditPost/>} />
            <Route exact path="/profile/:id" render={() => <ProfilePage />} />
            <Route exact path="/profile/:id/edit" render={() => <EditProfile />} />
            <Route exact path="/profile/:id/edit/password"render={() => <EditPassword/>} />
            <Route exact path="/signup" render={() => <SignUpForm/>} />
            <Route exact path="/signin" render={() => <SignInForm/>} />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
      </div>
    </NavbarContext.Provider>
  );
}

export default App;