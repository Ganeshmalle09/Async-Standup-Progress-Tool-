'use client'

import { useState } from 'react'
import { Send, Smile, Frown, Meh } from 'lucide-react'

export default function StandupForm() {
  const [form, setForm] = useState({
    yesterday: '',
    today: '',
    blockers: '',
    sentiment: 'neutral'
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/standups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        setSubmitted(true)
        setForm({ yesterday: '', today: '', blockers: '', sentiment: 'neutral' })
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Error submitting standup:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700 font-medium">✓ Standup submitted successfully!</p>
          <p className="text-green-600 text-sm mt-1">Your update has been shared with the team.</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What did you accomplish yesterday?
          </label>
          <textarea
            value={form.yesterday}
            onChange={(e) => setForm({ ...form, yesterday: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Describe your completed tasks..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are you working on today?
          </label>
          <textarea
            value={form.today}
            onChange={(e) => setForm({ ...form, today: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Describe your planned tasks..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any blockers or challenges?
          </label>
          <textarea
            value={form.blockers}
            onChange={(e) => setForm({ ...form, blockers: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
            placeholder="Mention any obstacles..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How are you feeling about your work?
          </label>
          <div className="flex space-x-4">
            {[
              { value: 'positive', icon: Smile, label: 'Positive', color: 'text-green-500' },
              { value: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
              { value: 'negative', icon: Frown, label: 'Challenged', color: 'text-red-500' },
            ].map(({ value, icon: Icon, label, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm({ ...form, sentiment: value })}
                className={`flex flex-col items-center p-3 rounded-lg border-2 ${
                  form.sentiment === value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`h-6 w-6 ${color}`} />
                <span className="text-sm mt-1">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-gray-500">
          <span className="font-medium">95%</span> of team members have submitted today
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <Send className="h-4 w-4 mr-2" />
          {loading ? 'Submitting...' : 'Submit Standup'}
        </button>
      </div>
    </form>
  )
}
