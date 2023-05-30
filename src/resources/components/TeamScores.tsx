import { Table } from 'react-bootstrap'
import translator from '../../helpers/translator.json';
import { ITeamStats } from '../../types/store/slices/ITeams';
import { ITranslator } from '../../types/helpers/ITranslator';

function TeamScores({ stats }: { stats: ITeamStats }) {

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
        {Object.entries(stats.fixtures).sort(
          (a, _b) => { if (a[0] === 'played') return 1; else return -1; }
        ).map(([key, value]) => (
          <tr key={`fixtures-${key}`}>
            <td>{(translator.fixtures as ITranslator)[key]}</td>
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
