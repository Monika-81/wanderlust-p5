import './App.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import CreatePost from './pages/feed/CreatePost';



function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/feed" render={() => <h1>Feed</h1>} />
          <Route exact path="/liked" render={() => <h1>Liked</h1>} />
          <Route exact path="/feed/create" render={() => <CreatePost/>} />
          <Route exact path="/profile" render={() => <h1>Profile</h1>} />
          <Route exact path="/signup" render={() => <SignUpForm/>} />
          <Route exact path="/signin" render={() => <SignInForm/>} />
        </Switch>
        <h1>Pictures area</h1>
      </Container>
    </div>
  );
}

export default App;