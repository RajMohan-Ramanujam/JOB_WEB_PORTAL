import { useState, useEffect } from "react";
import API from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/users/me")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          My Profile
        </h1>

        <div className="mb-4">
          <p className="text-gray-500">Name</p>
          <p className="font-bold text-gray-800">{user.name}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-500">Email</p>
          <p className="font-bold text-gray-800">{user.email}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-500">Role</p>
          <p className="font-bold text-gray-800">{user.role}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-500">Date of Birth</p>
          <p className="font-bold text-gray-800">
            {user.dob
              ? new Date(user.dob).toLocaleDateString()
              : "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
