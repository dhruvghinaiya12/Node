import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
import ApiLink from "../config/API";
import { UserToken } from "../UserToken";

const UserPortfolio = () => {
  const [portfolio, setPortfolio] = useState();
  const userToken = UserToken();

  const userId = userToken.id;

  // console.log("User ID:", userId);

  const fetchPortfolio = async (userId) => {
    try {
      const res = await ApiLink.get(`/portfolio/${userId}`);
      console.log("Fetched Portfolio Data:", res.data);
      setPortfolio(res.data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  useEffect(() => {
    fetchPortfolio(userId);
  }, [userId]);

  return (
    <div>
      {portfolio ? (
        <div>
          <h2>Your Portfolio</h2>
          <ul>
            <li>
              <strong>About Me:</strong> {portfolio.aboutMe}
            </li>
            <li>
              <strong>Skills:</strong> {portfolio.skills}
            </li>
            <li>
              <strong>Work Experience:</strong> {portfolio.workExperiences}
            </li>
            <li>
              <strong>Education:</strong> {portfolio.education}
            </li>
            <li>
              <strong>Projects:</strong> {portfolio.projects}
            </li>
            <li>
              <strong>GitHub:</strong> {portfolio.socialLinks.github}
            </li>
            <li>
              <strong>LinkedIn:</strong> {portfolio.socialLinks.linkedin}
            </li>
            <li>
              <strong>Website:</strong> {portfolio.socialLinks.website}
            </li>
            <li>
              <strong>Resume:</strong>
              <span>{portfolio.resumeUrl}</span>
            </li>
            <li>
              <strong>Experience Level:</strong> {portfolio.experienceLevel}
            </li>
          </ul>
        </div>
      ) : (
        <p>Loading portfolio...</p>
      )}
    </div>
  );
};

export default UserPortfolio;
