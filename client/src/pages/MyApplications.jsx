import { useState, useEffect } from 'react'
import API from '../api/axios'

function MyApplications() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    API.get('/apply/my')
      .then(res => setApplications(res.data))
      .catch(err => console.log(err))
  }, [])

  const cancelApplication = async (id) => {
    try {
      await API.delete(`/apply/${id}`)
      setApplications(applications.filter(app => app._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        My Applications
      </h1>

      {applications.length === 0 && (
        <p className="text-center text-gray-500">No applications yet!</p>
      )}

      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        {applications.map((app) => (
          <div key={app._id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">
              {app.job ? app.job.title : 'Job not found'}
            </h2>
            <p className="text-gray-500">
              {app.job ? app.job.company : ''}
            </p>
            <p className="text-gray-500">
              {app.job ? app.job.location : ''}
            </p>
            <p className="text-gray-500">
              {app.job ? app.job.salary : ''}
            </p>

            <span className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-bold ${
              app.status === 'accepted' ? 'bg-green-100 text-green-700' :
              app.status === 'rejected' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {app.status}
            </span>

            {app.status === 'pending' && (
              <button
                onClick={() => cancelApplication(app._id)}
                className="mt-3 ml-4 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm">
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyApplications