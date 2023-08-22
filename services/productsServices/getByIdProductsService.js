const getByIdProductsModel = require('../../models/productsModels/getByIdProductsModel')

const getById = async (id) => {
  const product = await getByIdProductsModel(id);
  if (!product) return { error: { code: 'notFound', message: 'Product not found' } };
  return product;   
};

module.exports = getById;