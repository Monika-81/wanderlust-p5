import './App.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom'
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


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route 
            exact path="/" 
            render={() => <FeedPage 
            message="No results found. Pleaase adjust search criteria."/>} 
          />
          <Route exact path="/posts" render={() => <h1>Feed</h1>} />
          <Route exact path="/posts/create" render={() => <CreatePost/>} />
          <Route exact path="/posts/:id" render={() => <PostPage/>} />
          <Route exact path="/posts/:id/edit" render={() => <EditPost/>} />
          <Route exact path="/liked" render={() => <h1>Liked</h1>} />
          <Route exact path="/profile/:id" render={() => <ProfilePage />} />
          <Route exact path="/signup" render={() => <SignUpForm/>} />
          <Route exact path="/signin" render={() => <SignInForm/>} />
          <Route exact path="/profile/:id/edit" render={() => <EditProfile />} />
          <Route exact path="/profile/:id/edit/password"render={() => <EditPassword/>} />
        </Switch>
      </Container>
      <h1>Link to top of page</h1>
    </div>
  );
}

export default App;