import { useState, useEffect } from "react";
import API from "../api/axios";

function Applicants() {
  const [applications, setApplications] = useState([]);
  const backendUrl = "https://job-web-portal-ysqb.onrender.com";

  useEffect(() => {
    API.get("/apply/all")
      .then((res) => setApplications(res.data))
      .catch((err) => console.log(err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/apply/${id}/status`, { status });
      setApplications(
        applications.map((app) => (app._id === id ? { ...app, status } : app)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Applicants
      </h1>

      {applications.length === 0 && (
        <p className="text-center text-gray-500">No applicants yet!</p>
      )}

      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        {applications.map((app) => (
          <div key={app._id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">
              {app.applicant ? app.applicant.name : "Unknown"}
            </h2>

            <p className="text-gray-500">
              {app.applicant ? app.applicant.email : ""}
            </p>

            {app.applicant && app.applicant.resume && (
              <a
                href={`${backendUrl}/${app.applicant.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                View Resume
              </a>
            )}

            <p className="text-gray-600 mt-2">
              Job: {app.job ? app.job.title : "Unknown"}
            </p>

            <span
              className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-bold ${
                app.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : app.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {app.status}
            </span>

            {app.status === "pending" && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateStatus(app._id, "accepted")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(app._id, "rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applicants;
