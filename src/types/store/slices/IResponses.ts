export interface ISuccessfullyResponse {
    get: string;
    parameters: Record<string, string> | [];
    errors: {
        time: string;
        bug: string;
        report: string;
    } | [];
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: unknown | [];
    user: string;
}

export interface IBuggedResponse {
    message: string;
}