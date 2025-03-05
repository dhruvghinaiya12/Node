import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiLink from "../config/API";

const JobsDetails = () => {
  const [job, setjob] = useState({});
  const [applied, setapplied] = useState([]);
  const { id } = useParams();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };


  const getApplications = async () => {
    let res = await ApiLink.get(`/applications/job/${id}`);
    const { data } = res;
    console.log(data);
    setjob(data.job);
    setapplied(data.app);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplications();
  }, [id]);

  console.log(job, applied);

  return (
    <div>
      <h1>job details</h1>
      <h2>title: {job.title}</h2>
      <p>description: {job.description}</p>
      <h3>EndDate: {formatDate(job.endDate)}</h3>
    </div>
  );
};

export default JobsDetails;
