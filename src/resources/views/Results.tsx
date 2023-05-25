import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { fetchTeamDetails } from '../../api';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlayersTable from '../components/PlayersTable';
import TeamScores from '../components/TeamScores';
import GoalsChart from '../components/GoalsChart';

function Results() {
  const filters = useSelector((state: RootState) => state.filters);
  const userKey = useSelector((state: RootState) => state.user.key);
  const statistics = useSelector((state: RootState) => state.teams.stats.find(t => t.name === filters.team));

  const redirect = useNavigate();

  useEffect(() => {
    if (!userKey || !userKey.length) redirect('/');
  }, [userKey]);

  useEffect(() => {
    if (!statistics) fetchTeamDetails();
  }, [filters, statistics]);
  
  return (
    <>
      <h2>{filters.team}</h2>
      <Container>
        <p>{filters.league} - {filters.season}</p>
      </Container>
      <Container>
        <h3>JOGADORES:</h3>
        <PlayersTable />
      </Container>
      <Container>
        <h3>FORMAÇÃO(ÕES) MAIS UTILIZADA(S):</h3>
        <p>{statistics?.lineUp.map(f => f.formation)}</p>
        <p>utilizada {statistics?.lineUp[0].played} vezes</p>
      </Container>
      <Container>
        <h3>RESULTADOS:</h3>
        <TeamScores />
      </Container>
      {/* <Container>
        <GoalsChart />
      </Container> */}
    </>
  );
}

export default Results