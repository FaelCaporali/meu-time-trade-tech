export type TSelectInputProps = {
    field: 'country' | 'season' | 'league' | 'team';
    options: string[]|number[];
    disabled: boolean;
    onChange: (value: string | number | undefined) => void;
}