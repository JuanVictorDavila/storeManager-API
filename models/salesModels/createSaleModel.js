const connection = require('../connection/connection');
const createSaleProductsModel = require('./createSaleProductsModel')

const create = async (products) => {
  const query = 'INSERT INTO sales (id) VALUES (DEFAULT)';
  const [{ insertId: id }] = await connection.execute(query);
  await createSaleProductsModel(
    products.map(({ product_id: prodId, quantity }) => [id, prodId, quantity]),
  );
  return { id };
};

module.exports = create;