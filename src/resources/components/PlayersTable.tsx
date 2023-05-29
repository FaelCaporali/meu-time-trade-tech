import { Table } from 'react-bootstrap'
import { ITeamStats } from '../../types/store/slices/ITeams'
import translator from '../../helpers/translator.json'

const PlayersTable = ({ stats }: { stats: ITeamStats }) => {
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
          <tr key={`player-row${p.player.id}`}>
            <td>{i + 1}</td>
            <td>{p.player.name}</td>
            <td>{p.player.age}</td>
            <td>{translator.nationalities[p.player.nationality] || p.player.nationality}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default PlayersTable