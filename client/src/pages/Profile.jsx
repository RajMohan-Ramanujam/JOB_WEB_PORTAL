import { useState, useEffect } from 'react'
import API from '../api/axios'

function Profile() {
  const [user, setUser] = useState(null)
  const [resumeMsg, setResumeMsg] = useState('')
  const [picMsg, setPicMsg] = useState('')
  const backendUrl = 'https://job-web-portal-ysqb.onrender.com'

  useEffect(() => {
    API.get('/users/me')
      .then(res => setUser(res.data))
      .catch(err => console.log(err))
  }, [])

  // ✅ Resume Upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('resume', file)

    try {
      await API.post('/users/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setResumeMsg('✅ Resume uploaded successfully!')
      const res = await API.get('/users/me')
      setUser(res.data)

    } catch (err) {
      console.log(err.response?.data || err.message)
      setResumeMsg(err.response?.data?.message || '❌ Upload failed')
    }
  }

  // ✅ Profile Picture Upload
  const handlePicUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('profilePicture', file)

    try {
      await API.post('/users/profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setPicMsg('✅ Profile picture updated!')
      const res = await API.get('/users/me')
      setUser(res.data)

    } catch (err) {
      console.log(err.response?.data || err.message)
      setPicMsg(err.response?.data?.message || '❌ Upload failed')
    }
  }

  if (!user) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          My Profile
        </h1>

        {/* Profile Picture */}
        <div className="text-center mb-6">
          {user.profilePicture ? (
            <img
              src={`${backendUrl}/${user.profilePicture}`}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover mb-3 border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center text-gray-500">
              No Photo
            </div>
          )}

          <label className="cursor-pointer inline-block bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
            Change Photo
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handlePicUpload}
              className="hidden"
            />
          </label>

          {picMsg && (
            <p className="text-sm mt-2 text-center">
              {picMsg}
            </p>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium text-gray-800">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Role</p>
            <p className="font-medium text-gray-800 capitalize">{user.role}</p>
          </div>

          <div>
            <p className="text-gray-500">Date of Birth</p>
            <p className="font-medium text-gray-800">
              {user.dob
                ? new Date(user.dob).toLocaleDateString()
                : 'Not provided'}
            </p>
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <p className="text-gray-500 text-sm mb-2">Resume</p>

          {user.resume && (
            <a
              href={`${backendUrl}/${user.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm block mb-3"
            >
              View Current Resume
            </a>
          )}

          {user.role === 'seeker' ? (
            <>
              <label className="cursor-pointer w-full block text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Upload Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>

              {resumeMsg && (
                <p className="text-sm mt-2 text-center">
                  {resumeMsg}
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-400 text-sm">
              Only job seekers can upload resumes
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Profile