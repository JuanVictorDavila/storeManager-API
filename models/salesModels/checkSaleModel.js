const connection = require('../connection/connection');

const checkSale = async (id) => {
  const query = 'SELECT id FROM StoreManager.sales WHERE id = ?';
  const [[sale]] = await connection.execute(query, [id]);
  return sale;
};

module.exports = checkSale;