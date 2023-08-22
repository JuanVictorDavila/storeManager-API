const validateSalesService = require('../../services/salesServices/validateSale');

const validateSale = (req, _res, next) => {
  const products = req.body;
  const validation = validateSalesService(products);
  if (validation.error) return next(validation.error);
  next();
};

module.exports = validateSale;