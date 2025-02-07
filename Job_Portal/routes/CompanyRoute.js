const { Router } = require("express");
const CompanyController = require("../controller/CompanyController");
const Role = require("../middleware/CheckRole");

const CompanyRoutes = Router();

CompanyRoutes.post("/create", Role(["HR"]), CompanyController.createCompany);
CompanyRoutes.get("/", Role(["HR"]), CompanyController.getAllCompanies);
CompanyRoutes.get("/:id", CompanyController.getCompanyById);
CompanyRoutes.patch("/:id", Role(["Admin","HR"]), CompanyController.updateCompany);
CompanyRoutes.delete("/:id", Role(["Admin","HR"]), CompanyController.deleteCompany);

module.exports = CompanyRoutes;