const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  jobTitle: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  jobDescription: { type: String, trim: true },
  jobStatus: { type: String, enum: ["completed", "running"] },
});

const educationSchema = new mongoose.Schema({
  institutionName: { type: String, required: true, trim: true },
  degree: { type: String, trim: true },
  fieldOfStudy: { type: String, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  educationStatus: { type: String, enum: ["completed", "running"] },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  link: { type: String, trim: true },
});

const portfolioSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    aboutMe: { type: String, trim: true },
    skills: [{ type: String, trim: true }],
    workExperiences: [workExperienceSchema],
    education: [educationSchema],
    projects: [projectSchema],
    socialLinks: {
      github: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      website: { type: String, trim: true },
    },
    profileImage: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
    experienceLevel: {
      type: String,
      enum: ["experienced", "fresher"],
      required: true,
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
