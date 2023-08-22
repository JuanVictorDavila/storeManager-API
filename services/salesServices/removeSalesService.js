const removeSalesModel = require('../../models/salesModels/removeSaleModel');
const getByIdSaleModel = require('../../models/salesModels/getByIdSaleModel')
const updateProductsQuantityModel = require('../../models/productsModels/updateProductsQuantityModel')

const remove = async (id) => {
  const sale = await getByIdSaleModel(id);
  if (sale.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };
  await removeSalesModel(id);
  await updateProductsQuantityModel(sale, '+');
  return sale;
};

module.exports = remove;