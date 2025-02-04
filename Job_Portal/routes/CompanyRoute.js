const { Router } = require("express");
const CompanyController = require("../controller/CompanyController");

const CompanyRoutes = Router();

CompanyRoutes.post("/create", CompanyController.createCompany);
CompanyRoutes.get("/", CompanyController.getAllCompanies);
CompanyRoutes.get("/:id", CompanyController.getCompanyById);
CompanyRoutes.patch("/:id", CompanyController.updateCompany);
CompanyRoutes.delete("/:id", CompanyController.deleteCompany);

module.exports = CompanyRoutes;