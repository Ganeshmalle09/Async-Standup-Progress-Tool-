'use client'

import { Users, Target, Zap, TrendingUp } from 'lucide-react'

const teamMembers = [
  { name: 'John Doe', role: 'Senior Dev', status: 'submitted', time: '9:30 AM' },
  { name: 'Sarah Chen', role: 'Product Manager', status: 'submitted', time: '10:15 AM' },
  { name: 'Mike Rodriguez', role: 'UX Designer', status: 'submitted', time: '11:45 AM' },
  { name: 'Emma Wilson', role: 'Backend Dev', status: 'pending', time: 'Not yet' },
  { name: 'Alex Kim', role: 'QA Engineer', status: 'submitted', time: '8:45 AM' },
  { name: 'Lisa Wang', role: 'DevOps', status: 'submitted', time: '9:15 AM' },
]

export default function TeamOverview() {
  const submittedCount = teamMembers.filter(m => m.status === 'submitted').length
  const submissionRate = Math.round((submittedCount / teamMembers.length) * 100)

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Team Overview</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          {teamMembers.length} members
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Standup Completion</span>
            <span className="font-semibold">{submissionRate}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${submissionRate}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center">
              <Target className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Goals Met</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-2">87%</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Productivity</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-2">+24%</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Today's Updates</h3>
        {teamMembers.map((member, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
            <div className="flex items-center">
              <div className={`h-2 w-2 rounded-full mr-3 ${
                member.status === 'submitted' ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <div>
                <div className="font-medium text-gray-900">{member.name}</div>
                <div className="text-sm text-gray-500">{member.role}</div>
              </div>
            </div>
            <div className={`text-sm ${member.status === 'submitted' ? 'text-green-600' : 'text-gray-400'}`}>
              {member.status === 'submitted' ? `✓ ${member.time}` : 'Pending'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center text-sm text-gray-600">
          <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
          <span>Team productivity increased by <strong>25%</strong> since implementing async standups</span>
        </div>
      </div>
    </div>
  )
}
