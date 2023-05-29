export interface ITeamInfo
{
    team: {
        id: number;
        name: string;
        code: string;
        country: string;
        founded: number;
        national: boolean;
        logo: string;
    };
    venue: {
        id: number;
        name: string;
        address: string;
        city: string;
        capacity: number;
        surface: string;
        image: string;
    };
}

interface IGoals<T>
{
    home: T;
    away: T;
    total: T;
}

interface IResults
{
    total: IGoals<number>;
    average: IGoals<string>;
    minute: IMinutesStats;
}

interface IGoalMinute
{
    total: number | null;
    percentage: string | null;
}

interface IMinutesStats
{
    "0-15": IGoalMinute;
    "16-30": IGoalMinute;
    "31-45": IGoalMinute;
    "46-60": IGoalMinute;
    "61-75": IGoalMinute;
    "76-90": IGoalMinute;
    "91-105": IGoalMinute;
    "106-120": IGoalMinute;
}

interface IGoalStats
{
    for: IResults;
    against: IResults;
}


export interface ITeamStats
{
    teamId: number;
    name: string;
    season: number;
    league: number;
    players: IPlayer[];
    lineUp: {
        formation: string;
        played: number;
    }[];
    fixtures: {
        played: IGoals<number>;
        wins: IGoals<number>;
        draws: IGoals<number>;
        loses: IGoals<number>;
    };
    goals: IGoalStats;
}

export interface ITeamsStatsState
{
    list: ITeamInfo[];
    stats: ITeamStats[];
}