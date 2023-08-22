const connection = require('../connection/connection');

const getAll = async () => {
  const query = `SELECT sale_id, product_id, quantity, date 
  FROM sales_products AS sp JOIN sales AS s 
  ON sp.sale_id = s.id`;
  const [sales] = await connection.execute(query);
  return sales;
};

module.exports = getAll;