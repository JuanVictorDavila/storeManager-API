const productModel = require('../models/productsModel');
const productSchema = require('../schemas/productSchema');

const validateProducts = ({ name, quantity }) => {
  const validateProduct = productSchema.validate({ name, quantity });

  return validateProduct;
};

const create = async ({ name, quantity }) => {
  const product = await productModel.getByName(name);

  if (product) return { error: { code: 'Já existente', message: 'Produto já existe.' } };

  const { id } = await productModel.create({ name, quantity });
  
  return { id, name, quantity };
};

const getAll = async () => { productModel.getAll(); };

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { error: { code: 'Não encontrado', message: 'Produto não encontrado.' } };

  return product;
};

const update = async (id, { name, quantity }) => {
  const product = await productModel.getById(id);

  if (!product) return { error: { code: 'Não encontrado', message: 'Produto não encontrado.' } };

  await productModel.update(id, { name, quantity });

  return { id, name, quantity };
};

const remove = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { error: { code: 'Não encontrado', message: 'Produto não encontrado.' } };

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