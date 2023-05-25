import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
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
import { fetchLeagues, fetchTeams } from "../../api";
import store from "../../store";

function Search() {
  const redirect = useNavigate();

  const filters = useSelector((state: RootState) => state.filters);
  const { country, season, league, team } = filters;
  const countriesOPT = useSelector((state: RootState) => state.countries.list.map(c => c.name));
  const seasonsOPT = useSelector((state: RootState) => state.seasons.years);
  const leagueOPT = useSelector((state: RootState) => {
    return state.leagues.list.filter(l => l.country.name === country).map(l => l.league.name)
  });
  const teamOPT = useSelector((state: RootState) => {
    return state.teams.list.filter(t => t.team.country === country).map(t => t.team.name);
  });
  const userKey = useSelector((state: RootState) => state.user.key);

  useEffect(() => {
    if (userKey === '' || userKey === undefined) redirect('/');
  }, [userKey]);

  useEffect(() => {
    if (
      country && country.length
      && season && season > 0
      && !team
      && !leagueOPT.length
    ) {
      fetchLeagues();
    }
    else if (
      country && country.length
      && season && season > 0
      && league && league.length
      && !teamOPT.length
    ) {
      fetchTeams()
    }
  }, [country, season, league, team, leagueOPT, teamOPT]);

  return (
    <>
      <Container>
        <SelectInput
          field="country"
          options={countriesOPT}
          disabled={false}
          onChange={(value: string|undefined|number) => {
            if (value === undefined) store.dispatch(clearCountry());
            else store.dispatch(setCountry(value as string));
          }}
        />
      </Container>
  
      <Container>
        <SelectInput
          field="season"
          options={seasonsOPT}
          disabled={country === undefined}
          onChange={(value: string|undefined|number) => {
            if (value === undefined) store.dispatch(clearSeason());
            else store.dispatch(setSeason(value as number));
          }}
        />
      </Container>
      <Container>
        <SelectInput
          field="league"
          options={leagueOPT}
          disabled={season === undefined || country === undefined}
          onChange={(value: string|undefined|number) => {
            if (value === undefined) store.dispatch(clearLeague());
            else store.dispatch(setLeague(value as string));
          }}
        />
      </Container>
      <Container>
        <SelectInput
          field="team"
          options={teamOPT}
          disabled={
            league === undefined
              || season === undefined
              || country === undefined
          }
          onChange={(value: string|undefined|number) => {
            if (value === undefined) store.dispatch(clearTeam());
            else store.dispatch(setTeam(value as string));
          }}
        />
      </Container>
      <Button
        onClick={async () => {
          if (country && season && league && team) {
            redirect('/results');
          }
        }}
        variant="secondary"
        size="sm"
        className="m-3"
      >
            BUSCAR TIME
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="m-3"
        onClick={() => {
          store.dispatch(clearFilters());
        }}
      >
            LIMPAR FILTROS
      </Button>
    </>
  );
}

export default Search;
