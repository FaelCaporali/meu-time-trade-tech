export interface ICountry {
    name: string;
    code: string|null;
    flag: string|null;
}

export interface ICountriesState {
    list: ICountry[];
}