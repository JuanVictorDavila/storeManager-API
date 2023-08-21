const productsModel = require('../../models/productsModel')

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { error: { code: 'notFound', message: 'Product not found' } };
  return product;   
};

module.exports = getById;