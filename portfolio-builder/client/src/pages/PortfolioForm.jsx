import { useState } from "react";
import ApiLink from "../config/API";

const PortfolioForm = () => {
  const [portfolioData, setPortfolioData] = useState({
    aboutMe: "",
    skills: "",
    workExperiences: [],
    education: [],
    projects: [],
    socialLinks: {
      github: "",
      linkedin: "",
      website: "",
    },
    profileImage: "",
    resumeUrl: "",
    experienceLevel: "fresher",
  });

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setPortfolioData({
      ...portfolioData,
      [name]: value,
    });
  };

  const HandleInputlinks = (e) => {
    const { name, value } = e.target;
    setPortfolioData({
      ...portfolioData,
      socialLinks: {
        ...portfolioData.socialLinks,
        [name]: value,
      },
    });
  };

  const postdata = async () => {
    try {
      let res = await ApiLink.post("/portfolio", portfolioData);
      console.log(res.data);
    } catch (error) {
      console.error("Error creating portfolio:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(portfolioData);
    postdata();
    setPortfolioData({
      aboutMe: "",
      skills: "",
      workExperiences: [],
      education: [],
      projects: [],
      socialLinks: {
        github: "",
        linkedin: "",
        website: "",
      },
      profileImage: "",
      resumeUrl: "",
      experienceLevel: "fresher",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create Portfolio
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="aboutMe" className="block text-gray-700 font-medium">
            About Me
          </label>
          <textarea
            name="aboutMe"
            value={portfolioData.aboutMe}
            onChange={HandleInput}
            id="aboutMe"
            placeholder="Tell us about yourself"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 font-medium">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            value={portfolioData.skills}
            onChange={HandleInput}
            id="skills"
            placeholder="Comma separated skills"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="workExperiences"
            className="block text-gray-700 font-medium"
          >
            Work Experience
          </label>
          <textarea
            name="workExperiences"
            value={portfolioData.workExperiences}
            onChange={HandleInput}
            placeholder="Describe your work experience"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="education"
            className="block text-gray-700 font-medium"
          >
            Education
          </label>
          <textarea
            name="education"
            value={portfolioData.education}
            onChange={HandleInput}
            placeholder="Your education details"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="projects" className="block text-gray-700 font-medium">
            Projects
          </label>
          <textarea
            name="projects"
            value={portfolioData.projects}
            onChange={HandleInput}
            placeholder="Your projects details"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="github" className="block text-gray-700 font-medium">
              GitHub
            </label>
            <input
              type="url"
              name="github"
              value={portfolioData.socialLinks.github}
              onChange={HandleInputlinks}
              id="github"
              placeholder="GitHub profile URL"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="linkedin"
              className="block text-gray-700 font-medium"
            >
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin"
              value={portfolioData.socialLinks.linkedin}
              onChange={HandleInputlinks}
              id="linkedin"
              placeholder="LinkedIn profile URL"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-gray-700 font-medium"
            >
              Website
            </label>
            <input
              type="url"
              name="website"
              value={portfolioData.socialLinks.website}
              onChange={HandleInputlinks}
              id="website"
              placeholder="Personal website URL"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="profileImage"
            className="block text-gray-700 font-medium"
          >
            Profile Image URL
          </label>
          <input
            type="url"
            name="profileImage"
            value={portfolioData.profileImage}
            onChange={HandleInput}
            id="profileImage"
            placeholder="Link to profile image"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="resumeUrl"
            className="block text-gray-700 font-medium"
          >
            Resume URL
          </label>
          <input
            type="url"
            name="resumeUrl"
            value={portfolioData.resumeUrl}
            onChange={HandleInput}
            id="resumeUrl"
            placeholder="Link to your resume"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="experienceLevel"
            className="block text-gray-700 font-medium"
          >
            Experience Level
          </label>
          <select
            name="experienceLevel"
            value={portfolioData.experienceLevel}
            onChange={HandleInput}
            id="experienceLevel"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="fresher">Fresher</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Portfolio
        </button>
      </form>
    </div>
  );
};

export default PortfolioForm;
