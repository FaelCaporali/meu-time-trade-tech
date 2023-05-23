export default interface APIConfig {
    method: string;
    url: string;
    headers: {
        'x-apisports-key': string;
        'x-rapidapi-host': string;
    };
}
