const getAllSalesService = require('../../services/salesServices/getAllSales')

const getAll = async (_req, res) => {
  const sales = await getAllSalesService();
  res.status(200).json(sales);
};

module.exports = getAll;