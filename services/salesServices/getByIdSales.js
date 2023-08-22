const getByIdSalesModel = require('../../models/salesModels/getByIdSaleModel');

const getById = async (id) => {
  const sale = await getByIdSalesModel(id);
  if (sale.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };
  return sale;
};

module.exports = getById;