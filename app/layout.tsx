import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Async Standup Tool | Accenture',
  description: 'Reduce meetings and improve clarity with async standups',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <span className="ml-3 text-xl font-bold text-gray-900">
                      Async Standup
                    </span>
                    <span className="ml-2 text-sm text-gray-500 hidden md:inline">
                      | Accenture
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                    Dashboard
                  </button>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
}
