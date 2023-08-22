const updateSalesService = require('../../services/salesServices/updateSalesService')

const update = async (req, res, next) => {
  const [sale] = req.body;
  const { id } = req.params;
  const newSale = await updateSalesService(id, sale);
  if (newSale.error) return next(newSale.error);
  res.status(200).json(newSale);
};

module.exports = update;