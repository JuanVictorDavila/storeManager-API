const connection = require('../connection/connection');

const createSaleProducts = async (products) => {
  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id,quantity) VALUES ?';
  await connection.query(query, [products]);
};

module.exports = createSaleProducts;