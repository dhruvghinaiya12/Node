const express = require("express");
const ApplicationController = require("../controller/ApplicationController");

const ApplicationRoutes = express.ApplicationRoutes();

ApplicationRoutes.get("/", ApplicationController.getAllApplications);
ApplicationRoutes.post("/", ApplicationController.createApplication);
ApplicationRoutes.patch("/:id", ApplicationController.updateApplication);
ApplicationRoutes.get("/user/:userId", ApplicationController.getApplicationsByUserId);
ApplicationRoutes.get("/job/:jobId", ApplicationController.getApplicationsByJobId);

module.exports = ApplicationRoutes;