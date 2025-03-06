import React, { useEffect, useState } from "react";
import ApiLink from "../config/API";

const Profile = () => {
  const [applications, setApplications] = useState([]);

  const fetchProfile = async () => {
    try {
      let res = await ApiLink.get("applications/user");
      setApplications(res.data);
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container mx-auto p-6 text-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Job Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-600 text-center">No applications found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="px-6 py-3 border">Job Title</th>
                <th className="px-6 py-3 border">Job Type</th>
                <th className="px-6 py-3 border">Location</th>
                <th className="px-6 py-3 border">Salary</th>
                <th className="px-6 py-3 border">Status</th>
                <th className="px-6 py-3 border">Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={index}
                  className="border text-center hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="px-6 py-4 border">{app.jobId.title}</td>
                  <td className="px-6 py-4 border">{app.jobId.jobType}</td>
                  <td className="px-6 py-4 border">{app.jobId.location}</td>
                  <td className="px-6 py-4 border">{app.jobId.salary}</td>
                  <td className="px-6 py-4 border text-green-600 font-semibold">
                    {app.status}
                  </td>
                  <td className="px-6 py-4 border">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;
