import React, { useEffect, useState } from "react";
import ApiLink from "../config/API";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";

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

  const ApplyJob = async (jobId) => {
    try {
      let res = await ApiLink.post("/applications", { jobId: jobId });
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
            {jobs.map((job) => (
              <JobCard key={job._id} {...job} ApplyJob={ApplyJob} nav={nav} />
            ))}
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
