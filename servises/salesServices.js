const salesModel = require('../models/salesModel');
const saleSchema = require('../schemas/saleSchema');
const productModel = require('../models/productsModel');

const validateTheSale = (products) => {
  for (let indexSale = 0; indexSale < products.length; indexSale += 1) {
    const handleSale = {
      productId: products[indexSale].product_id,
      quantity: products[indexSale].quantity,
    };

    const validation = saleSchema.validate(handleSale);

    if (validation.error) return validation;
  }
  return {};
};

const validateProductQuantity = async (products) => {
  const dataProducts = await Promise.all(products.map(
    ({ product_id: id }) => productModel.getById(id),
  ));

  for (let indexQuantity = 0; indexQuantity < products.length; indexQuantity += 1) {
    if (products[indexQuantity].quantity > dataProducts[indexQuantity]) return false;
  }
  
  return true;
};

const create = async (products) => {
  const validQuantity = await validateProductQuantity(products);

  if (!validQuantity) {
    return { error: { code: 'amountError', message: 'Such amount is not permitted to sell' } };
  }

  await productModel.updateProductsQuantity(products, '');
  const { id } = await salesModel.getAll(products);

  return { id, itemSold: products };
};

const getAll = async () => { await salesModel.getAll(); };

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (saleSchema.length === 0) return { error: { code: 'notFound', message: 'Sale nor found' } };

  return sale;
};

const update = async (id, newSale) => {
  const { product_id: productId, quantity } = newSale;
  const sale = await salesModel.checkSales(id);

  if (!sale) return { error: { code: 'notFound', message: 'sale not found' } };

  await salesModel.update(id, { productId, quantity });

  return {
    saleId: id,
    itemUpdate: [newSale],
  };
};

const remove = async (id) => {
  const sale = await salesModel.getById(id);

  if (sale.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };

  await salesModel.remove(id);
  await productModel.updateProductsQuantity(sale, '');

  return sale;
};

module.exports = {
  validateTheSale,
  validateProductQuantity,
  create,
  getAll,
  getById,
  update,
  remove,
};