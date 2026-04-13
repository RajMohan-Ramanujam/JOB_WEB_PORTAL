import { useState, useEffect } from 'react'
import API from '../api/axios'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const role = localStorage.getItem('role')
  const name = localStorage.getItem('name')

  useEffect(() => {
    const url = role === 'recruiter' ? '/dashboard/recruiter' : '/dashboard/seeker'
    API.get(url)
      .then(res => setStats(res.data))
      .catch(err => console.log(err))
  }, [])

  if (!stats) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">
        Welcome, {name}!
      </h1>
      <p className="text-gray-500 mb-8">
        {role === 'recruiter' ? 'Recruiter Dashboard' : 'Job Seeker Dashboard'}
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-2xl">
        {role === 'seeker' ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl font-bold text-blue-600">{stats.totalApplied}</p>
              <p className="text-gray-500 mt-2">Total Applied</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl font-bold text-yellow-500">{stats.pending}</p>
              <p className="text-gray-500 mt-2">Pending</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl font-bold text-green-600">{stats.accepted}</p>
              <p className="text-gray-500 mt-2">Accepted</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-gray-500 mt-2">Rejected</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl font-bold text-blue-600">{stats.jobsPosted}</p>
              <p className="text-gray-500 mt-2">Jobs Posted</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl font-bold text-yellow-500">{stats.totalApplicants}</p>
              <p className="text-gray-500 mt-2">Total Applicants</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl font-bold text-green-600">{stats.shortlisted}</p>
              <p className="text-gray-500 mt-2">Shortlisted</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard