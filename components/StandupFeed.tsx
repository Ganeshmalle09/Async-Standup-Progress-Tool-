'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Clock, AlertCircle, Smile, Meh, Frown } from 'lucide-react'
import { format } from 'date-fns'

interface Standup {
  id: number
  userId: string
  userName: string
  userRole: string
  yesterday: string
  today: string
  blockers: string
  sentiment: 'positive' | 'neutral' | 'negative'
  timestamp: string
}

export default function StandupFeed() {
  const [standups, setStandups] = useState<Standup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStandups()
  }, [])

  const fetchStandups = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/standups?filter=today')
      const data = await response.json()
      setStandups(data.data)
    } catch (error) {
      console.error('Error fetching standups:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="h-5 w-5 text-green-500" />
      case 'negative': return <Frown className="h-5 w-5 text-red-500" />
      default: return <Meh className="h-5 w-5 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin pr-2">
      {standups.map((standup) => (
        <div key={standup.id} className="border rounded-lg p-5 hover:border-gray-300 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {standup.userName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{standup.userName}</h3>
                <p className="text-sm text-gray-500">{standup.userRole}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getSentimentIcon(standup.sentiment)}
              <span className="text-sm text-gray-500">
                {format(new Date(standup.timestamp), 'h:mm a')}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span className="font-medium">Yesterday</span>
              </div>
              <p className="text-gray-700 pl-6">{standup.yesterday}</p>
            </div>

            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                <span className="font-medium">Today</span>
              </div>
              <p className="text-gray-700 pl-6">{standup.today}</p>
            </div>

            {standup.blockers && (
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="font-medium">Blockers</span>
                </div>
                <p className="text-gray-700 pl-6">{standup.blockers}</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t flex justify-end">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Add follow-up
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
