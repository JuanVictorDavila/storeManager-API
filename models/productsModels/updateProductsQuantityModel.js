const connection = require('../connection/connection');

const updateProductsQty = async (products, sign) => {
  const query = `UPDATE products SET quantity = quantity ${sign} ? WHERE id = ?`;
  await Promise.all(products.map(
    ({ product_id: id, quantity }) => connection.execute(query, [quantity, id]),
  ));
};

module.exports = updateProductsQty;
