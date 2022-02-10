const productModel = require('../models/productsModel');
const productSchema = require('../schemas/productSchema');

const validateProducts = ({ name, quantity }) => {
  const validateProduct = productSchema.validate({ name, quantity });

  return validateProduct;
};

const create = async ({ name, quantity }) => {
  const product = await productModel.getByName(name);

  if (product) return { error: { code: 'alreadyExists', message: 'product already exists' } };

  const { id } = await productModel.create({ name, quantity });
  
  return { id, name, quantity };
};

const getAll = async () => { productModel.getAll(); };

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { error: { code: 'notFound', message: 'product not found' } };

  return product;
};

const update = async (id, { name, quantity }) => {
  const product = await productModel.getById(id);

  if (!product) return { error: { code: 'notFound', message: 'product not found' } };

  await productModel.update(id, { name, quantity });

  return { id, name, quantity };
};

const remove = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { error: { code: 'notFound', message: 'product not found' } };

  await productModel.remove(id);

  return product;
};

module.export = {
  validateProducts,
  create,
  getAll,
  getById,
  update,
  remove,
};