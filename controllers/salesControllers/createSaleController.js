const salesService = require('../../services/salesService')

const create = async (req, res, next) => {
  const products = req.body;
  const sale = await salesService.create(products);
  if (sale.error) return next(sale.error);
  res.status(201).json(sale);
};

module.exports = create;