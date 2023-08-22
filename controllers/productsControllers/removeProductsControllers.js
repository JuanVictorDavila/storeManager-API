const removeProductsService = require('../../services/productsServices/removeProductsService');

const remove = async (req, res, next) => {
  const { id } = req.params;
  const product = await removeProductsService(id);
  if (product.error) return next(product.error);
  res.status(200).json(product);
};

module.exports = remove;