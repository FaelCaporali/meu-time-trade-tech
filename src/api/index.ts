import fetcher from "./fetcher";
import { setCountries } from "../store/slices/countries";
import store from "../store";
import { setSeasons } from "../store/slices/seasons";
import { setLeagues } from "../store/slices/leagues";
import { login, logout } from "../store/slices/user";
import { addStats, setList } from "../store/slices/teams";
import { addResponse } from "../store/slices/requests";

const checkKey = () => {
  const key = store.getState().user.key;
  if (!key.length) throw new Error('Forneça credenciais.');
  return key;
}

const checkCountry = () => {
  const country = store.getState().filters.country;
  if (!country) throw new Error('Selecione um país.');
  return country;
}

const checkSeason = () => {
  const season = store.getState().filters.season;
  if (!season) throw new Error('Selecione o ano.');
  return season;
}

const checkLeague = () => {
  const leagueName = store.getState().filters.league;
  if (!leagueName) throw new Error('Selecione o campeonato.');
  const league = store.getState().leagues.list.find((league) => league.league.name === leagueName)?.league.id;

  return league;
}

const checkTeam = () => {
  const teamName = store.getState().filters.team;
  if (!teamName) throw new Error('Selecione um time.');

  const team = store.getState().teams.list.find(t => t.team.name === teamName);

  if (!team) throw new Error('Erro ao buscar o time, tente novamente');

  return team;
}

const checkStats = () => {
  const stats = store.getState().teams.stats.find(t => t.name === checkTeam().team.name);
  if (!stats) return false;
  return true;
} 

export const fetchUserStatus = async (key: string) => {
  const response = await fetcher({
    url: `https://v3.football.api-sports.io/status`,
    headers: {
      'x-apisports-key': key,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  });

  store.dispatch(addResponse(response));

  if (Object.entries(response.errors).length) {
    store.dispatch(logout());
    throw new Error('credencial inválida');
  } else {
    store.dispatch(
      login({
        key,
        status: response.response
      })
    );
    return true;
  }
}

export const fetchCountries = async () => {
  const key = checkKey();
  
  const response = await fetcher({
    url: 'https://v3.football.api-sports.io/countries',
    headers: {
      'x-apisports-key': key,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  });

  store.dispatch(addResponse(response));

  if (
    response.errors.length
  ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');

  store.dispatch(setCountries(response.response));
}

export const fetchSeasons = async () => {
  const key = checkKey();

  const response = await fetcher({
    url: 'https://v3.football.api-sports.io/leagues/seasons',
    headers: {
      'x-apisports-key': key,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  });

  store.dispatch(addResponse(response));

  if (
    response.errors.length
  ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');

  store.dispatch(setSeasons(response.response));

}

export const fetchLeagues = async () => {
  const key = checkKey();
  const country = checkCountry();
  const season = checkSeason();

  const response = await fetcher({
    url: `https://v3.football.api-sports.io/leagues?season=${season}&country=${country}`,
    headers: {
      'x-apisports-key': key,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  });

  store.dispatch(addResponse(response));

  if (
    response.errors.length
  ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');

  store.dispatch(setLeagues(response.response));

}

export const fetchTeams = async () => {
  const key = checkKey();
  const country = checkCountry();
  const season = checkSeason();
  const league = checkLeague();

  const response = await fetcher({
    url: `https://v3.football.api-sports.io/teams?country=${country}&season=${season}&league=${league}`,
    headers: {
      'x-apisports-key': key,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  });

  store.dispatch(addResponse(response));

  if (
    response.errors.length
  ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');

  store.dispatch(setList(response.response));
}

export const fetchTeamDetails = async () => {
  const key = checkKey();
  const season = checkSeason();
  const league = checkLeague();  
  const team = checkTeam();
  const stats = checkStats();

  if (!stats) {

    const playersResponse = await fetcher({
      url: `https://v3.football.api-sports.io/players?&season=${season}&league=${league}&team=${team.team.id}`,
      headers: {
        'x-apisports-key': key,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });

    store.dispatch(addResponse(playersResponse));
  
    if (
      playersResponse.errors.length
    ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');
      
    const players: IPlayer[] = [...playersResponse.response];
    
    if (playersResponse.paging.total > 1) {
      for (let i = 2; i < playersResponse.paging.total; i++) {
        const morePlayers = await fetcher({
          url: `https://v3.football.api-sports.io/players?&season=${season}&league=${league}&team=${team.team.id}&page=${i}`,
          headers: {
            'x-apisports-key': key,
            'x-rapidapi-host': 'v3.football.api-sports.io'
          }
        });

        store.dispatch(addResponse(morePlayers));
        players.push(...morePlayers.response);
      }
    }
  
    const teamStats = await fetcher({
      url: `https://v3.football.api-sports.io/teams/statistics?&season=${season}&league=${league}&team=${team.team.id}`,
      headers: {
        'x-apisports-key': key,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });

    store.dispatch(addResponse(teamStats));
  
    store.dispatch(addStats({
      teamId: team.team.id,
      name: team.team.name,
      season: season,
      league: league || 0,
      players: players,
      lineUp: teamStats.response.lineups,
      fixtures: teamStats.response.fixtures,
      goals: teamStats.response.goals,
    }));
  }
}
