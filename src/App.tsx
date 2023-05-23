import { BrowserRouter } from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import Routes from './components/App.Routes';
import { useState } from 'react';
import fetcher from './api/fetcher';
import footballConfig from './api/football/config';
// import { Link } from 'react-router-dom'

function App() {
  const [status, setStatus] = useState({});
  
  const fetchStatus = async () => {
    try {
      const response = await fetcher(footballConfig())
      return response;
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  return (
    <BrowserRouter basename={import.meta.env.DEV ? '/' : import.meta.env.BASE_URL}>
      <Container>
        <Navbar>
          {/* <Login-logout /> */}
          {/* <Link to="/serach">Buscar</Link> */}
        </Navbar>
        <Container>
          <Routes />
        </Container>
        <Container>
          <Button onClick={async () => setStatus(await fetchStatus())}>teste</Button>
          {Object.entries(status).map(([key, value]) => <p>{key}: {value as string}</p>)}
        </Container>
      </Container>
    </BrowserRouter>
  );
}

export default App;
