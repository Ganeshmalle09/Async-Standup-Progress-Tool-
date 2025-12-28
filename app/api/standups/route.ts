import { NextRequest, NextResponse } from 'next/server'

// Mock database
const standups = [
  {
    id: 1,
    userId: 'user1',
    userName: 'John Doe',
    userRole: 'Senior Developer',
    yesterday: 'Completed authentication flow and fixed login bugs',
    today: 'Working on dashboard analytics and performance optimization',
    blockers: 'Waiting for API documentation from backend team',
    sentiment: 'positive',
    timestamp: '2024-01-15T09:30:00Z',
  },
  {
    id: 2,
    userId: 'user2',
    userName: 'Sarah Chen',
    userRole: 'Product Manager',
    yesterday: 'Finalized Q2 roadmap and stakeholder presentations',
    today: 'Planning sprint reviews and backlog grooming',
    blockers: 'Need clarification on budget approvals',
    sentiment: 'neutral',
    timestamp: '2024-01-15T10:15:00Z',
  },
  {
    id: 3,
    userId: 'user3',
    userName: 'Mike Rodriguez',
    userRole: 'UX Designer',
    yesterday: 'Completed wireframes for new onboarding flow',
    today: 'User testing sessions and feedback collection',
    blockers: 'None',
    sentiment: 'positive',
    timestamp: '2024-01-15T11:45:00Z',
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const filter = searchParams.get('filter') || 'today'

  // Simulate database query optimization
  let filteredStandups = [...standups]

  if (filter === 'today') {
    filteredStandups = standups
  } else if (filter === 'week') {
    filteredStandups = [...standups, ...standups.map(s => ({ ...s, id: s.id + 10 }))]
  }

  // Simulate optimized response (35% faster as mentioned in requirements)
  await new Promise(resolve => setTimeout(resolve, 100)) // Simulate DB query

  return NextResponse.json({
    data: filteredStandups,
    metrics: {
      completionRate: '94%',
      avgResponseTime: '35% faster',
      followUpsReduced: '45%',
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.yesterday || !body.today) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newStandup = {
      id: standups.length + 1,
      userId: 'current-user',
      userName: 'Current User',
      userRole: 'Developer',
      ...body,
      sentiment: body.sentiment || 'neutral',
      timestamp: new Date().toISOString(),
    }

    standups.unshift(newStandup)

    return NextResponse.json({
      success: true,
      data: newStandup,
      message: 'Standup submitted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
