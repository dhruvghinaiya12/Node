import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiLink from "../config/API";
import UserDetailsCard from "../components/UserDetailsCard";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const { id, jobId } = useParams();
  const [status, SetStatus] = useState("Applied");
  const StatusOptions = ["Applied", "Shortlisted", "Rejected", "Hired"];

  const getUserDetails = async () => {
    try {
      let res = await ApiLink.get(`user/info/${id}`);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateStatus = async (value) => {
    try {
      let res = await ApiLink.patch(`applications/${jobId}`, { status: value });

      alert("Status updated successfully!");  
    } catch (error) {
      console.log(error);
    }
  };

  const HandleStatus= async (e) => {
    SetStatus(e.target.value)
    UpdateStatus(e.target.value)
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  if (!userData) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <UserDetailsCard
        user={userData.user}
        userDetails={userData.userDetails}
        status={status}
        statusOptions={StatusOptions}
        HandleStatus={HandleStatus}
      />
    </div>
  );
};

export default UserDetails;
