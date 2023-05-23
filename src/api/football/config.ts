import dotenv from 'dotenv';

dotenv.config();

const devKey = process.env.API_SPORTS_KEY || '';
const basicEndpoint = 'status';

export default function footballConfig (endpoint: string = basicEndpoint, key: string = devKey) {
    return {
        url: `https://v3.football.api-sports.io/${endpoint}`,
        headers: {
            'x-apisports-key': key,
            'x-rapidapi-host': 'v3.football.api-sports.io',
        }
    };
}
