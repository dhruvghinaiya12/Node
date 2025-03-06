const Application = require("../model/ApplicationSchema");
const { GetById } = require("./JobService");

const ApplicationService = {
  getAllApplication: async (query) => {
    try {
      return await Application.find(query);
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (payload) => {
    try {
      return await Application.create(payload);
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, payload) => {
    try {
      return await Application.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  },
  getbyuserId: async (userId) => {
    try {
      return await Application.find({ user: userId });
    } catch (error) {
      throw new Error(error);
    }
  },
  getbyjobId: async (jobId) => {
    try {
      let job = await GetById(jobId);
      // console.log(jobId);
      
      let app = await Application.find({ jobId: jobId }).populate("userId");
      // console.log(app);
      
      return {
        job,
        app,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = ApplicationService;
