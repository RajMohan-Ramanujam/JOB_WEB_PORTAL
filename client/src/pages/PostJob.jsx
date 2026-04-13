import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function PostJob() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [jobType, setJobType] = useState('full-time')
  const [skills, setSkills] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/jobs', {
        title,
        description,
        company,
        location,
        salary,
        jobType,
        skills: skills.split(',').map(s => s.trim())
      })
      navigate('/jobs')
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-xl mx-auto">

        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Post a Job
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Job Title</label>
          <input type="text" value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="eg. React Developer"
            className="border rounded p-2 w-full" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job description..."
            className="border rounded p-2 w-full h-28" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Company</label>
          <input type="text" value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="eg. Tech Corp"
            className="border rounded p-2 w-full" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Location</label>
          <input type="text" value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="eg. Chennai"
            className="border rounded p-2 w-full" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Salary</label>
          <input type="text" value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="eg. 8 LPA"
            className="border rounded p-2 w-full" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Job Type</label>
          <select value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="border rounded p-2 w-full">
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="remote">Remote</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Skills</label>
          <input type="text" value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="eg. React, JavaScript, CSS"
            className="border rounded p-2 w-full" />
          <p className="text-gray-400 text-sm mt-1">Separate skills with commas</p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white w-full py-2 rounded font-bold hover:bg-blue-700">
          Post Job
        </button>

      </div>
    </div>
  )
}

export default PostJob