const getByIdProductsModel = require('../../models/productsModels/getByIdProductsModel')
const removeProductsModel = require('../../models/productsModels/removeProductsModel')

const remove = async (id) => {
  const product = await getByIdProductsModel(id);
  if (!product) return { error: { code: 'notFound', message: 'Product not found' } };
  await removeProductsModel(id);
  return product;
};

module.exports = remove;