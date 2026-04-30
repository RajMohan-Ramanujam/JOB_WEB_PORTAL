import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-blue-600 text-white text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-lg mb-8">
          Thousands of jobs waiting for you
        </p>
        <Link to="/jobs">
          <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100">
            Browse Jobs
          </button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-bold text-center mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-3 gap-6 text-center">
          <Link to="/register">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md">
              <div className="text-3xl mb-3">1</div>
              <h3 className="font-bold mb-2">Create Account</h3>
              <p className="text-gray-500 text-sm">Register as job seeker or recruiter

hfhtfdhgiljoilhgjh;oljkjghgilj;ilhjhgvchjhj
                .
              </p>
            </div>
          </Link>
          <Link to="/jobs">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md">
              <div className="text-3xl mb-3">2</div>
              <h3 className="font-bold mb-2">Search Jobs</h3>
              <p className="text-gray-500 text-sm">Browse and filter jobs by location and role</p>
            </div>
          </Link>
          <Link to="/jobs">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md">
              <div className="text-3xl mb-3">3</div>
              <h3 className="font-bold mb-2">Apply</h3>
              <p className="text-gray-500 text-sm">Apply with one click and track status</p>
            </div>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home