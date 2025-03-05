import React, { useEffect, useState } from "react";
import ApiLink from "../config/API";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  const nav = useNavigate();

  const displayJobs = async () => {
    try {
      let res = await ApiLink.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    displayJobs();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const ApplyJob = async (jobId) => {
    try {
      let res = await ApiLink.post("/applications", { jobId: jobId });
      console.log(res.data);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying job:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {jobs.length > 0 ? (
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">Job Listings</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(
              ({
                title,
                salary,
                requiredSkills,
                requiredExp,
                location,
                jobType,
                description,
                endDate,
                _id,
              }) => (
                <div
                  key={_id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <h2 className="text-2xl font-bold text-center mb-2">
                    {title}
                  </h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Salary:</span> {salary}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Required Skills:</span>{" "}
                    {requiredSkills}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Experience:</span>{" "}
                    {requiredExp}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> {location}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Job Type:</span> {jobType}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Description:</span>{" "}
                    {description}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">End Date:</span>{" "}
                    {formatDate(endDate)}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                    onClick={() => ApplyJob(_id)}
                    aria-label="Apply for job"
                  >
                    Apply
                  </button>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"onClick={()=>nav(`/job/${_id}`)} >
                    View
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No job listings available at the moment.
        </p>
      )}
    </div>
  );
};

export default Home;
