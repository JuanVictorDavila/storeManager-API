const getByIdSalesService = require('../../services/salesServices/getByIdSales')

const getById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await getByIdSalesService(id);
  if (sale.error) return next(sale.error);
  res.status(200).json(sale);
};

module.exports = getById;