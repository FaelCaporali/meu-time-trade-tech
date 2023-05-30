import { renderWithRouterAndStore } from '../helpers/renderer';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as fetcher from '../../api/fetcher';
import * as api from '../../api/index';
import store from '../../store';

import StateInflator from '../../resources/components/StateInflator';
import Search from '../../resources/views/Search';

import countriesMock from '../__mocks__/api/countries/countries.json';
import seasonMock from '../__mocks__/api/leagues/leagues-seasons.json';
import leaguesMock from '../__mocks__/api/leagues/leagues.json';
import teamsMock from '../__mocks__/api/teams/teams-by-season-and-league.json';

describe('Testes da tela de busca', () => {
  describe('Elementos devem estar visíveis na tela', () => {
    afterEach(() => {
      jest.clearAllMocks();
    })
    test('Busca elementos de filtro e botão de busca, sem conteúdo de options', async () => {
      renderWithRouterAndStore(<Search />);
      const country = await screen.findByLabelText('Selecione o país');
      const season = await screen.findByLabelText('Selecione a temporada');
      const league = await screen.findByLabelText('Selecione o campeonato');
      const team = await screen.findByLabelText('Selecione o time');
      const submitBtn = await screen.findByRole('button', { name: 'BUSCAR TIME'});
      const cleatBtn = await screen.findByRole('button', { name: 'LIMPAR FILTROS'});

      expect(country).toBeInTheDocument();
      expect(season).toBeInTheDocument();
      expect(league).toBeInTheDocument();
      expect(team).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
      expect(cleatBtn).toBeInTheDocument();
    });

    test('Testa se elementos se tornam interativos em ordem correta, fornecendo options', async () => {
      // jest.spyOn(api, 'fetchCountries').mockImplementation(() => Promise.resolve(undefined));
      jest.spyOn(fetcher, 'default')
        .mockImplementationOnce(() => Promise.resolve(countriesMock))
        .mockImplementationOnce(() => Promise.resolve(seasonMock))
        .mockImplementationOnce(() => Promise.resolve(leaguesMock))
        .mockImplementationOnce(() => Promise.resolve(teamsMock));

      jest.spyOn(api, 'checkKey').mockImplementation(() => 'any');
      jest.spyOn(api, 'checkCountry').mockImplementation(() => 'Brazil');
      jest.spyOn(api, 'checkSeason').mockImplementation(() => 2022);
      jest.spyOn(api, 'checkLeague').mockImplementation(() => 71);

      const { store: fakeStore  } = renderWithRouterAndStore(<StateInflator><Search /></StateInflator>);

      jest.spyOn(store, 'dispatch').mockImplementation(fakeStore.dispatch);

      const country = await screen.findByLabelText('Selecione o país');
      const season = await screen.findByLabelText('Selecione a temporada');
      const league = await screen.findByLabelText('Selecione o campeonato');
      const team = await screen.findByLabelText('Selecione o time');
      const submitBtn = await screen.findByRole('button', { name: 'BUSCAR TIME'});
      

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
      expect(submitBtn).toBeDisabled();

      await userEvent.selectOptions(team, 'Atletico-MG');

      expect(submitBtn).not.toBeDisabled();
    });
  });
});
