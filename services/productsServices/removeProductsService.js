const productsModel = require('../../models/productsModel')

const remove = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { error: { code: 'notFound', message: 'Product not found' } };
  await productsModel.remove(id);
  return product;
};

module.exports = remove;