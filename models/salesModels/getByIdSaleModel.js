const connection = require('../connection/connection');

const getById = async (id) => {
  const query = `SELECT product_id, quantity, date 
  FROM sales_products AS sp JOIN sales AS s 
  ON sp.sale_id = s.id WHERE sale_id = ?`;
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

module.exports = getById;