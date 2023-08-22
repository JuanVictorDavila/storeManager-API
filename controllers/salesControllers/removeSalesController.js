const removeSalesService = require('../../services/salesServices/removeSalesService')

const remove = async (req, res, next) => {
  const { id } = req.params;
  const sale = await removeSalesService(id);
  if (sale.error) return next(sale.error);
  res.status(200).json(sale);
};

module.exports = remove;