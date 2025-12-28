import StandupForm from '@/components/StandupForm'
import StandupFeed from '@/components/StandupFeed'
import ProgressChart from '@/components/ProgressChart'
import TeamOverview from '@/components/TeamOverview'

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Async Standup Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Reduce meetings by 50% and improve team clarity with async updates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Submit Your Daily Standup
            </h2>
            <StandupForm />
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Team Updates
              </h2>
              <select className="text-sm border rounded-lg px-3 py-1.5">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <StandupFeed />
          </div>
        </div>

        <div className="space-y-8">
          <TeamOverview />
          <ProgressChart />
        </div>
      </div>
    </main>
  )
}
