const getAllSalesModel = require('../../models/salesModels/getAllSaleModel');
const serialize = require('./serializeSales');

const getAll = async () => {
  const sales = await getAllSalesModel();
  return serialize(sales);
};

module.exports = getAll;