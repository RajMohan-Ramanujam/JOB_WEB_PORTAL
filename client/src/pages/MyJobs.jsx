import { useState, useEffect } from 'react'
import API from '../api/axios'

function MyJobs() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    API.get('/jobs/my')
      .then(res => setJobs(res.data))
      .catch(err => console.log(err))
  }, [])

  const deleteJob = async (id) => {
    try {
      await API.delete(`/jobs/${id}`)
      setJobs(jobs.filter(job => job._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        My Job Listings
      </h1>

      {jobs.length === 0 && (
        <p className="text-center text-gray-500">No jobs posted yet!</p>
      )}

      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-gray-500">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
            <p className="text-green-600 font-bold">{job.salary}</p>
            <p className="text-gray-500 mt-2">{job.jobType}</p>

            <button
              onClick={() => deleteJob(job._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Delete Job
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyJobs