const connection = require('../connection/connection');

const update = async (id, { productId, quantity }) => {
  const query = `UPDATE sales_products 
  SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
  await connection.execute(query, [quantity, id, productId]);
};

module.exports = update;