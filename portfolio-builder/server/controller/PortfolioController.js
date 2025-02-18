const portfolioService = require("../services/portfolioService");

exports.createPortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioService.create(req.body);
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPortfolioByUserId = async (req, res) => {
  try {
    const { userId } = req.params; 
    const portfolio = await portfolioService.PortfolioByUserId(userId); 
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
