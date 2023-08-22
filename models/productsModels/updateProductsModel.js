const connection = require('../connection/connection');

const update = async (id, { name, description, category, manufacturer, price, quantity }) => {
  const query = `UPDATE products SET 
    name = ?, 
    description = ?, 
    category = ?,
    manufacturer = ?,
    price = ?, 
    quantity = ? 
  WHERE id = ?`;

  await connection.execute(query, [name, description, category, manufacturer, price, quantity, id]);
};

module.exports = update;