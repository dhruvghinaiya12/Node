const express = require("express");
const portfolioController = require("../controller/PortfolioController");
const PortfolioRoutes = express.Router();

PortfolioRoutes.post("/", portfolioController.createPortfolio);
PortfolioRoutes.get("/:userId", portfolioController.getPortfolioByUserId);

module.exports = PortfolioRoutes;
