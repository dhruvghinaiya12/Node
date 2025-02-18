import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ApiLink from "../config/API";

const UserPortfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const userId = Cookies.get("userId");

  const fetchPortfolio = async (userId) => {
    try {
      const res = await ApiLink.get(`/portfolio/${userId}`);
      setPortfolio(res.data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPortfolio(userId); 
    } else {
      console.log("User is not logged in");
    }
  }, [userId]);

  return (
    <div>
      {portfolio ? (
        <div>
          <h2>Your Portfolio</h2>
          <p>About Me: {portfolio.aboutMe}</p>
          <p>Skills: {portfolio.skills}</p>
          <p>Work Experience: {portfolio.workExperiences}</p>
          <p>Education: {portfolio.education}</p>
          <p>Projects: {portfolio.projects}</p>
          <p>GitHub: {portfolio.socialLinks.github}</p>
          <p>LinkedIn: {portfolio.socialLinks.linkedin}</p>
          <p>Website: {portfolio.socialLinks.website}</p>
          <p>Resume: {portfolio.resumeUrl}</p>
          <p>Experience Level: {portfolio.experienceLevel}</p>
        </div>
      ) : (
        <p>Loading portfolio...</p>
      )}
    </div>
  );
};

export default UserPortfolio;
