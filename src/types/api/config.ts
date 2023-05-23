export default interface IAPIConfig {
    url: string;
    headers: {
        'x-apisports-key': string;
        'x-rapidapi-host': string;
    };
}
