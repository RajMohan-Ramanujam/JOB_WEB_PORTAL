import { useState, useEffect } from 'react'
import API from '../api/axios'

function JobCard({ job }) {
  const [applied, setApplied] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    API.get('/apply/my')
      .then(res => {
        const alreadyApplied = res.data.some(app => app.job && app.job._id === job._id)
        if (alreadyApplied) setApplied(true)
      })
      .catch(err => console.log(err))
  }, [])

  const handleApply = async () => {
    try {
      await API.post(`/apply/${job._id}`)
      setApplied(true)
      setMessage('Applied successfully!')
    } catch (err) {
      setMessage('Something went wrong')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
      <p className="text-gray-500">{job.company}</p>
      <p className="text-gray-500">{job.location}</p>
      <p className="text-green-600 font-bold">{job.salary}</p>

      {message && <p className="text-blue-600 mt-2">{message}</p>}

      <button
        onClick={handleApply}
        disabled={applied}
        className={`mt-4 px-6 py-2 rounded text-white font-bold ${
          applied ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {applied ? 'Applied' : 'Apply Now'}
      </button>
    </div>
  )
}

export default JobCard