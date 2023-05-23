import { BrowserRouter } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import Routes from './components/App.Routes';
// import { Link } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter basename={process.env.DEV ? '/' : process.env.BASE_URL}>
      <Container>
        <Navbar>
          {/* <Login-logout /> */}
          {/* <Link to="/serach">Buscar</Link> */}
        </Navbar>
        <Container>
          <Routes />
        </Container>
      </Container>
    </BrowserRouter>
  );
}

export default App;
