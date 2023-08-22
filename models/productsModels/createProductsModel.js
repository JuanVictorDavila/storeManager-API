const connection = require('../connection/connection');

const create = async ({ name, description, category, manufacturer, price, quantity }) => {
  const query = `INSERT INTO products (
    name, 
    description, 
    category,
    manufacturer,
    price, 
    quantity
    ) VALUES (?,?,?,?,?,?)`;

  const [{ insertId: id }] = await connection.execute(query, 
    [
      name, 
      description, 
      category, 
      manufacturer,
      price, 
      quantity,
    ]);
  return { id };
};

module.exports = create;