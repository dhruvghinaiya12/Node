import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiLink from "../config/API";
import UserDetailsCard from "../components/UserDetailsCard";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  const getUserDetails = async () => {
    try {
      let res = await ApiLink.get(`user/info/${id}`);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (!userData) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <UserDetailsCard user={userData.user} userDetails={userData.userDetails} />
    </div>
  );
};

export default UserDetails;
