import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-6">

        <div>
          <h3 className="font-bold text-lg mb-3">Job Web Portal</h3>
          <p className="text-gray-400 text-sm">
            Find your dream job or hire the best talent.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2 text-gray-400 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/jobs" className="hover:text-white">Jobs</Link>
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to="/register" className="hover:text-white">Register</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Contact</h3>
          <p className="text-gray-400 text-sm">jobportal@gmail.com</p>
          <p className="text-gray-400 text-sm">+91 98765 43210</p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        © 2026 Job Web Portal. All rights reserved by mcc.
      </div>

    </footer>
  )
}

export default Footer