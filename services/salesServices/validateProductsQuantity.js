const getByIdProductsModel = require('../../models/productsModels/getByIdProductsModel');

const validatePoductsQty = async (products) => {
  const dbProducts = await Promise.all(products.map(
    ({ product_id: id }) => getByIdProductsModel(id),
  ));
  for (let i = 0; i < products.length; i += 1) {
    if (products[i].quantity > dbProducts[i].quantity) return false;
  }
  return true;
};

module.exports = validatePoductsQty;