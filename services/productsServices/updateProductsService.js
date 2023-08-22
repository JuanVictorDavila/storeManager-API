const updateProductsModel = require('../../models/productsModels/updateProductsModel')
const getByIdProductsModel = require('../../models/productsModels/getByIdProductsModel')

const update = async (id, { name, description, category, manufacturer, price, quantity }) => {
  const product = await getByIdProductsModel(id);
  if (!product) return { error: { code: 'notFound', message: 'Product not found' } };
  await updateProductsModel(id, { name, description, category, manufacturer, price, quantity });
  return { id, name, description, category, manufacturer, price, quantity };
};

module.exports = update;