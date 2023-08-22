const createSaleModel = require('../../models/salesModels/createSaleModel');
const updateProductsQuantityModel = require('../../models/productsModels/updateProductsQuantityModel')
const validatePoductsQty = require('./validateProductsQuantity');

const create = async (products) => {
  const valid = await validatePoductsQty(products);
  if (!valid) { 
    return { error: { code: 'amountError', message: 'Such amount is not permitted to sell' } }; 
  } 
  await updateProductsQuantityModel(products, '-');
  const { id } = await createSaleModel(products);
  return { id, itemsSold: products };
};

module.exports = create;