const updateSaleModel = require('../../models/salesModels/updateSaleModel');
const checkSale = require('../../models/salesModels/checkSaleModel')

const update = async (id, newSale) => {
  const { product_id: productId, quantity } = newSale;
  const sale = await checkSale(id);
  if (!sale) return { error: { code: 'notFound', message: 'Sale not found' } };
  await updateSaleModel(id, { productId, quantity });
  return {
    saleId: id,
    itemUpdated: [newSale],
  };
};

module.exports = update;