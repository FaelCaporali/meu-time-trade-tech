import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ITeamStats } from '../../types/store/slices/ITeams';


function GoalsChart({ stats }: { stats: ITeamStats }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const opt = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gols por minutos',
      }
    }
  }
  
  const data = {
    labels: Object.keys(stats.goals.for.minute),
    datasets: [
      {
        label: `Gols pró (${stats.goals.for.total.total})`,
        data: Object.values(stats.goals.for.minute).map(g => g.total || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: `Gols contra (${stats.goals.against.total.total})`,
        data: Object.values(stats.goals.against.minute).map(g => g.total || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ],
  }

  return (
    <Line options={opt} data={data} />
  )
}

export default GoalsChart