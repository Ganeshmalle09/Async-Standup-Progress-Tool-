'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function ProgressChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Standup Completion Rate',
        data: [85, 88, 92, 94, 96, 89, 93],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Follow-up Reduction',
        data: [30, 35, 40, 45, 48, 42, 45],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 70,
        ticks: {
          callback: function(value: number) {
            return value + '%'
          }
        }
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Progress Metrics</h2>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-green-600">+35%</span> faster responses
        </div>
      </div>
      
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600 font-medium">Completion Rate</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">94%</div>
          <div className="text-xs text-gray-500 mt-1">+12% from last week</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600 font-medium">Follow-ups Reduced</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">45%</div>
          <div className="text-xs text-gray-500 mt-1">-25% fewer meetings</div>
        </div>
      </div>
    </div>
  )
}
