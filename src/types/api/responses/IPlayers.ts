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