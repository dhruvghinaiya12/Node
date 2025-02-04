const Company = require("../model/CompanySchema");

exports.createCompany = async (payload) => {
  return await Company.create(payload);
};
exports.getAllCompany = async () => {
  return await Company.find();
};

exports.getCompanyById = async (id) => {
  return await Company.findById(id);
};

exports.updateCompany = async (id, payload) => {
  return await Company.findByIdAndUpdate(id, payload, { new: true });
};

exports.deleteCompany = async (id) => {
  return await Company.findByIdAndDelete(id);
};
