import { useState } from "react";
import { Container, FormLabel, FormSelect } from "react-bootstrap";
// import { useStore } from "react-redux";

function Search() {
  // const store = useStore();
  const [country, setCountry] = useState('');

  return (
    <Container>
      <FormLabel>Selecione o país
        <FormSelect value={country} onChange={(e) => setCountry(e.target.value)}>
          {/* {store.getState()
          .countries.map((country) => (
            <option key={country.name} value={country.name}>{country.name}</option>
          ))
          } */}
        </FormSelect>
      </FormLabel>
    </Container>
  );
}

export default Search;