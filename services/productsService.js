const productsModel = require('../models/productsModel');
const productSchema = require('../schemas/productSchema');

const validateProducts = ({ name, quantity }) => {
  const validation = productSchema.validate({ name, quantity });
  return validation;
};

const create = async ({ name, quantity }) => {  
  const product = await productsModel.getByName(name);
  if (product) return { error: { code: 'alreadyExists', message: 'Product already exists' } };

  const { id } = await productsModel.create({ name, quantity });
  return { id, name, quantity };
};

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { error: { code: 'notFound', message: 'Product not found' } };
  return product;   
};

const update = async (id, { name, quantity }) => {
  const product = await productsModel.getById(id);
  if (!product) return { error: { code: 'notFound', message: 'Product not found' } };
  await productsModel.update(id, { name, quantity });
  return { id, name, quantity };
};

const del = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { error: { code: 'notFound', message: 'Product not found' } };
  await productsModel.del(id);
  return product;
};

module.exports = {
  create,
  validateProducts,
  getAll,
  getById,
  update,
  del,
};
