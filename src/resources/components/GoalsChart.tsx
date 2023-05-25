import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { Chart as chartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2';

function GoalsChart() {
  const filters = useSelector((state: RootState) => state.filters);
  const stats = useSelector((state: RootState) => state.teams.stats).find(t => t.name === filters.team);
  
  return (
    <Line data={Object.values(stats?.goals.minutes).map((m) => m.total)} />
  )
}

export default GoalsChart