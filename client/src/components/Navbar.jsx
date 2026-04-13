
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Job Web Portal
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/jobs" className="hover:underline">Jobs</Link>

        {name ? (
          <>
            <span>Hello, {name}!</span>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>

            {role === "seeker" && (
              <Link to="/my-applications" className="hover:underline">
                My Applications
              </Link>
            )}

            {role === "recruiter" && (
              <>
                <Link to="/post-job" className="hover:underline">Post Job</Link>
                <Link to="/my-jobs" className="hover:underline">My Jobs</Link>
                <Link to="/applicants" className="hover:underline">Applicants</Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded font-bold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;