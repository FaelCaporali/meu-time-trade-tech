import Search from '../../resources/views/Search';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helpers/renderer';
import userEvent from '@testing-library/user-event';

describe('Testes da tela de busca', () => {
  describe('Elementos devem estar visíveis na tela', () => {
    test('Busca elementos de filtro e botão de busca', async () => {
      renderWithRouterAndStore(<Search />);
      const country = await screen.findByLabelText('Selecione o país');
      const season = await screen.findByLabelText('Selecione a temporada');
      const league = await screen.findByLabelText('Selecione o campeonato');
      const team = await screen.findByLabelText('Selecione o time');
      const btn = await screen.findByRole('button');

      expect(country).toBeInTheDocument();
      expect(season).toBeInTheDocument();
      expect(league).toBeInTheDocument();
      expect(team).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
    });

    test('Testa se elementos se tornam interativos em ordem correta', async () => {
      const wrapper = renderWithRouterAndStore(<Search />);

      const country = await screen.findByLabelText('Selecione o país');
      const season = await screen.findByLabelText('Selecione a temporada');
      const league = await screen.findByLabelText('Selecione o campeonato');
      const team = await screen.findByLabelText('Selecione o time');
      const btn = await screen.findByRole('button');

      expect(country).not.toBeDisabled();
      expect(season).toBeDisabled();

      await userEvent.selectOptions(country, 'Brazil');

      expect(season).not.toBeDisabled();
      expect(league).toBeDisabled();

      await userEvent.selectOptions(season, '2022');
            
      expect(league).not.toBeDisabled();
      expect(team).toBeDisabled();
            
      await userEvent.selectOptions(league, 'Serie A');
            
      expect(team).not.toBeDisabled();
      expect(btn).toBeDisabled();

      await userEvent.selectOptions(team, 'Atlético Mineiro');

      expect(btn).not.toBeDisabled();

      await userEvent.click(btn);

      expect(wrapper.route).toBe('/results');
    })
  });
});
