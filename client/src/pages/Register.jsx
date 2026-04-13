import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from "../api/axios";
function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('seeker')
  const [error, setError  ] = useState()
  const navigate = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await API.post("/auth/register", {name, email, password, role,dob });
      
        navigate("/login");
      } catch (err) {
        setError("something is worng, try again");
      }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">

        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Register
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Who are you?</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="seeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
 {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button 
        onClick={ handleSubmit}  className="bg-blue-600 text-white w-full py-2 rounded font-bold hover:bg-blue-700">
          Register
        </button>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register