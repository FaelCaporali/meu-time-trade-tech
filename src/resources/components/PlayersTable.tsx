import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import translator from '../../helpers/translator.json'

const PlayersTable = () => {
  const { team } = useSelector((state: RootState) => state.filters);
  const stats = useSelector((state: RootState) => state.teams.stats).find(t => t.name === team);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Idade</th>
          <th>Nacionalidade</th>
        </tr>
      </thead>
      <tbody>
        {stats?.players.map((p, i) => (
          <tr>
            <td>{i + 1}</td>
            <td>{p.name}</td>
            <td>{p.age}</td>
            <td>{translator.nationalities[p.nationality] || p.nationality}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default PlayersTable