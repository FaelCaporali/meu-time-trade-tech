import Search from '../../views/Search';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helpers/renderer';
import userEvent from '@testing-library/user-event';

describe('Testes da tela de busca', () => {
    describe('Elementos devem estar visíveis na tela', () => {
        test('Busca elementos de filtro e botão de busca', () => {
            renderWithRouterAndStore(<Search />);
            const country = screen.getByLabelText('Selecione o país');
            const season = screen.getByLabelText('Selecione a temporada');
            const league = screen.getByLabelText('Selecione o campeonato');
            const team = screen.getByLabelText('Selecione o time');
            const btn = screen.getByRole('button');

            expect(country).toBeInTheDocument();
            expect(season).toBeInTheDocument();
            expect(league).toBeInTheDocument();
            expect(team).toBeInTheDocument();
            expect(btn).toBeInTheDocument();
        });

        test('Testa se elementos se tornam interativos em ordem correta', async () => {
            const wrapper = renderWithRouterAndStore(<Search />);
            const country = screen.getByLabelText('Selecione o país');
            const season = screen.getByLabelText('Selecione a temporada');
            const league = screen.getByLabelText('Selecione o campeonato');
            const team = screen.getByLabelText('Selecione o time');
            const btn = screen.getByRole('button');

            expect(country).not.toBeDisabled();
            expect(season).toBeDisabled();

            userEvent.selectOptions(country, 'Brazil');

            expect(season).not.toBeDisabled();
            expect(league).toBeDisabled();

            userEvent.selectOptions(season, '2022');
            
            expect(league).not.toBeDisabled();
            expect(team).toBeDisabled();
            
            userEvent.selectOptions(league, 'Serie A');
            
            expect(team).not.toBeDisabled();
            expect(btn).toBeDisabled();

            userEvent.selectOptions(team, 'Atlético Mineiro');

            expect(btn).not.toBeDisabled();

            userEvent.click(btn);

            expect(wrapper.route).toBe('/results');
        })
    });
});
