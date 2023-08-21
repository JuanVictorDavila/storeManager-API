const productsModel = require('../../models/productsModel')

const update = async (id, { name, description, category, manufacturer, price, quantity }) => {
  const product = await productsModel.getById(id);
  if (!product) return { error: { code: 'notFound', message: 'Product not found' } };
  await productsModel.update(id, { name, description, category, manufacturer, price, quantity });
  return { id, name, description, category, manufacturer, price, quantity };
};

module.exports = update;