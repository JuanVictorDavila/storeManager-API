const getAllProductsService = require('../../services/productsServices/getAllProductsService');

const getAll = async (_req, res) => {
  const products = await getAllProductsService();
  res.status(200).json(products);
};

module.exports = getAll;