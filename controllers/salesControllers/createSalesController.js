const createSalesService = require('../../services/salesServices/createSalesService')

const create = async (req, res, next) => {
  const products = req.body;
  const sale = await createSalesService(products);
  if (sale.error) return next(sale.error);
  res.status(201).json(sale);
};

module.exports = create;