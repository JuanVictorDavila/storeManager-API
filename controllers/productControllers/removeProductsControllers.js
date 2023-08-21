const productsService = require('../../services/productsService');

const remove = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.del(id);
  if (product.error) return next(product.error);
  res.status(200).json(product);
};

module.exports = remove;