import './App.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Container>
        <NavBar />
        <h1>Picture</h1>
      </Container>
    </div>
  );
}

export default App;