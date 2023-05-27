import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { fetchTeamDetails } from '../../api';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlayersTable from '../components/PlayersTable';
import TeamScores from '../components/TeamScores';
import GoalsChart from '../components/GoalsChart';
import { ITeamStats } from '../../store/slices/teams';
import GlobalLoading from '../components/GlobalLoading';
import ComponentLoading from '../components/ComponentLoading';

function Results() {
  const [loading, setLoading] = useState(true);
  const [canFetch, setFetch] = useState(false);
  
  const userKey = useSelector((state: RootState) => state.user.key);
  const filters = useSelector((state: RootState) => state.filters);
  const stats = useSelector((state: RootState) => state.teams.stats.find((t) => (
    t.name == filters.team
    && t.season == filters.season
  )));

  const [mostUsedLineUp, setLineUp] = useState<{ formation: string; played: number }[]>([]);
  
  const redirect = useNavigate();
  
  useEffect(() => {
    
    if (!userKey || userKey.length === 0) redirect('/');
    
    else if (!stats) setFetch(true);
    
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (canFetch) {
      const doTheFetch = async () => { await fetchTeamDetails() };
      doTheFetch().then(() => {
        setFetch(false);
      });
    }
    setLoading(false);
  }, [canFetch]);
  
  useEffect(() => {
    setLoading(true);
    if (stats && stats.lineUp && stats.lineUp[0].formation != '') {
      setLineUp(stats.lineUp.reduce(
        (most: { formation: string; played: number }[], lineup: { formation: string; played: number }) => {
          if (most[0].played < lineup.played) {
            return [lineup];
          }
          if (most[0].played === lineup.played) {
            most.push(lineup);
            return most;
          }
          return most;
        }, [{ formation: '', played: 0 }]
      ));
    }
    setLoading(false);
  }, [stats])
  
  return (
    <>
      {
        loading ? <GlobalLoading /> : 
          <>
            <h2>{filters.team}</h2>
            <Container>
              <p>{filters.league} - {filters.season}</p>
            </Container>
            {stats && stats.players ? (<Container>
              <h3>JOGADORES:</h3>
              <PlayersTable stats={stats}/>
            </Container>) : <ComponentLoading />}
            {!mostUsedLineUp ? <ComponentLoading /> : (<Container>
              <h3>FORMAÇÃO(ÕES) MAIS UTILIZADA(S):</h3>
              <ul>{mostUsedLineUp.map(f => <li key={`most-used-lineup-${f.formation}`}>{f.formation}</li>)}</ul>
              <p>Utilizada(s) {mostUsedLineUp[0].played} vezes</p>
            </Container>)}
            {(stats && stats.fixtures) ? (<Container>
              <h3>RESULTADOS:</h3>
              <TeamScores stats={stats}/>
            </Container>) : <ComponentLoading />}
            {(stats && stats.goals) ? <Container>
              <GoalsChart stats={stats} />
            </Container> :  <ComponentLoading />}
          </>
      }
    </>
  );
}

export default Results