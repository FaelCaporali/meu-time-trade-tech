import fetcher from "./fetcher";
import { setCountries } from "../store/slices/countries";
import store from "../store";
import { setSeasons } from "../store/slices/seasons";
import { setLeagues } from "../store/slices/leagues";
import { login, logout } from "../store/slices/user";
import { addStats, setList } from "../store/slices/teams";

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

export const fetchUserStatus = async (key: string) => {
  const response = await fetcher({
    url: `https://v3.football.api-sports.io/status`,
    headers: {
      'x-apisports-key': key,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  });

  if (Object.entries(response.errors).length) {
    logout();
    throw new Error('credencial inválida');
  } else {
    login({
      key,
      status: response.response.status
    });
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

  if (
    response.status !== 200 ||
    response.errors.length
  ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');

  setCountries(response.response);
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

  if (
    response.status !== 200
    || response.errors.length
  ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');

  setSeasons(response.response);
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

  if (
    response.status !== 200
    || response.errors.length
  ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');

  setLeagues(response.response);
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

  if (
    response.status !== 200
    || response.errors.length
  ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');

  setList(response.response);
}

export const fetchTeamDetails = async () => {
  const key = checkKey();
  const season = checkSeason();
  const league = checkLeague();  
  const team = checkTeam();

  const playersResponse = await fetcher({
    url: `https://v3.football.api-sports.io/players?&season=${season}&league=${league}&team=${team.team.id}`,
    headers: {
      'x-apisports-key': key,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  });

  if (
    playersResponse.status !== 200
    || playersResponse.errors.length
  ) throw new Error('Erro de comunicação, aguarde um momento ou revise suas credencias.');

  const players: IPlayer[] = playersResponse.response;

  const teamStats = await fetcher({
    url: `https://v3.football.api-sports.io/teams/statistics?&season=${season}&league=${league}&team=${team.team.id}`,
    headers: {
      'x-apisports-key': key,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  });

  addStats({
    teamId: team.team.id,
    name: team.team.name,
    season: season,
    league: league || 0,
    players: players.map(p => ({
      id: p.player.id,
      name: p.player.name,
      age: p.player.age,
      nationality: p.player.nationality,
    })),
    lineUp: teamStats.response.lineups.reduce(
      (most: { formation: string; played: number }[], lineup: { formation: string; played: number }) => {
        if (most[0].played < lineup.played) {
          return [lineup];
        }
        if (most[0].played === lineup.played) {
          most.push(lineup);
          return most;
        }
        return most;
      }, [{ formation: '', played: 0 }]),
    fixtures: teamStats.response.fixtures,
    goals: teamStats.response.goals,
  })
}
interface IPlayer {
  player: {
    id:number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string|null;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
  statistics: IPlayerStats[];
}

interface IPlayerStats {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  games: {
    appearences: number;
    lineups: number;
    minutes: number;
    number: null|number;
    position: string;
    rating: null|string;
    captain: boolean;
  };
  substitutes: {
    in: number;
    out: number;
    bench: number;
  };
  shots: {
    total: number|null;
    on: number|null;
  };
  goals: {
    total: number;
    conceded: number;
    assists: number|null;
    saves: number|null;
  };
  passes: {
    total: number|null;
    key: number|null;
    accuracy: null|number;
  };
  tackles: {
    total: null|number;
    blocks: null|number;
    interceptions: null|number;
  };
  duels: {
    total: null|number;
    won: null|number;
  };
  dribbles: {
    attempts: null|number;
    success: null|number;
    past: null|number;
  };
  fouls: {
    drawn: null|number;
    committed: null|number;
  };
  cards: {
    yellow: number|null;
    yellowred: number|null;
    red: number|null;
  };
  penalty: {
    won: null|number;
    commited: null|number;
    scored: null|number;
    missed: null|number;
    saved: null|number;
  };
}