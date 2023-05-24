import { Container, Button } from "react-bootstrap";
import { useStore } from "react-redux";
import { RootState } from '../../store';
import SelectInput from "../components/SelectInput";
import {
  clearCountry,
  clearFilters,
  clearLeague,
  clearSeason,
  clearTeam,
  setCountry,
  setLeague,
  setSeason,
  setTeam
} from "../../store/slices/filters";
import { useNavigate } from 'react-router-dom'

function Search() {
  const store = useStore<RootState>();
  const state = store.getState();
  const redirect = useNavigate();

  return (
    <>
      <Container>
        <SelectInput
          field="country"
          options={state.countries.list.length ? state.countries.list.map(c => c.name) : ['Por favor, aguarde...']}
          disabled={false}
          onChange={(value: string|undefined|number) => {
            if (value === undefined) clearCountry();
            else if (typeof value === 'string') setCountry(value);
          }}
        />
      </Container>

      <Container>
        <SelectInput
          field="season"
          options={state.seasons.years.length ? state.seasons.years : ['Por favor, aguarde...']}
          disabled={state.filters.country === undefined}
          onChange={(value: string|undefined|number) => {
            if (value === undefined) clearSeason();
            else if (typeof value === 'number') setSeason(value);
          }}
        />
      </Container>
      <Container>
        <SelectInput
          field="league"
          options={state.leagues.list.length
            ? state.leagues.list.filter(
              l => l.country.name === state.filters.country
            ).map(l => l.league.name) : ['Por favor, aguarde...']}
          disabled={state.filters.season === undefined || state.filters.country === undefined}
          onChange={(value: string|undefined|number) => {
            if (value === undefined) clearLeague();
            else if (typeof value === 'string') setLeague(value);
          }}
        />
      </Container>
      <Container>
        <SelectInput
          field="team"
          options={state.teams.stats.length
            ? state.teams.stats.filter(
              t => t.league === state.filters.league
              && state.filters.season === t.season
            ).map(t => t.name) : ['Por favor, aguarde...']}
          disabled={
            state.filters.league === undefined
            || state.filters.season === undefined
            || state.filters.country === undefined
          }
          onChange={(value: string|undefined|number) => {
            if (value === undefined) clearTeam();
            else if (typeof value === 'string') setTeam(value);
          }}
        />
      </Container>
      <Button
        onClick={() => {
          // make request
          clearFilters();
          redirect('/results');

        }}
        variant="secondary"
        size="sm"
        className="mt-3"
      >
        BUSCAR TIME
      </Button>
    </>
  );
}

export default Search;
