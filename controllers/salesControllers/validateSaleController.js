const salesService = require('../../services/salesService');

const validateSale = (req, _res, next) => {
  const products = req.body;
  const validation = salesService.validateSale(products);
  if (validation.error) return next(validation.error);
  next();
};

module.exports = validateSale;