const connection = require('../connection/connection');

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [[product]] = await connection.execute(query, [name]);
  return product;
};

module.exports = getByName;