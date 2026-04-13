import JobCard from "../components/JobCard"
import { useState, useEffect } from "react"
import API from '../api/axios'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    API.get('/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.log(err))
  }, [])

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        All Jobs
      </h1>

      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by title, company or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-3 w-full"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">No jobs found!</p>
      )}

      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        {filtered.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  )
}

export default Jobs