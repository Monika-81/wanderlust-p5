import './App.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom'
import './api/axiosDefaults'


function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/feed" render={() => <h1>Feed</h1>} />
          <Route exact path="/liked" render={() => <h1>Liked</h1>} />
          <Route exact path="/add" render={() => <h1>Add</h1>} />
          <Route exact path="/profile" render={() => <h1>Profile</h1>} />
          <Route exact path="/signin" render={() => <h1>Sigh in</h1>} />
        </Switch>
        <h1>Picture</h1>
      </Container>
    </div>
  );
}

export default App;