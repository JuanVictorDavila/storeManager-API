const getByIdProductsService = require('../../services/productsServices/getByIdProductsService');

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await getByIdProductsService(id);
  if (product.error) return next(product.error);
  res.status(200).json(product);
};

module.exports = getById;