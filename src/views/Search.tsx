import { useState } from "react";
import { Container } from "react-bootstrap";
import { useStore } from "react-redux";
import { RootState } from '../store';
import SelectInput from "../components/SelectInput";

function Search() {
  const store = useStore<RootState>();
  const state = (store.getState());

  return (
    <Container>
      <SelectInput field="country" options={state.countries.length ? state.countries : ['Por favor, aguarde...']} disabled={false}/>
    </Container>
  );
}

export default Search;
