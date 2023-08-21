const productsService = require('../../services/productsService');

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product.error) return next(product.error);
  res.status(200).json(product);
};

module.exports = getById;