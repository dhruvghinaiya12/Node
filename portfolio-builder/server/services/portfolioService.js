const Portfolio = require("../schema/PortfolioSchema");

exports.create = async (data) => {
  return await Portfolio.create(data);
};

exports.PortfolioByUserId = async (userId) => {  
  return await Portfolio.findOne({ userId: userId });
};
