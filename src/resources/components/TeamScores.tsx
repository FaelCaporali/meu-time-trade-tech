import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Table } from 'react-bootstrap'
import translator from '../../helpers/translator.json';
import { ITeamStats } from '../../store/slices/teams';

function TeamScores() {
  const filters = useSelector((state: RootState) => state.filters);
  const stats = useSelector((state: RootState) => state.teams.stats).find(t => t.name === filters.team);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Mandante</th>
          <th>Visitante</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(((stats as ITeamStats)?.fixtures)).sort(
          (a, _b) => { if (a[0] === 'total') return 1; else return -1; }
        ).map(([key, value]) => (
          <tr key={`fixtures-${key}`}>
            <td>{translator.fixtures[key]}</td>
            <td>{value.home}</td>
            <td>{value.away}</td>
            <td>{value.total}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TeamScores
