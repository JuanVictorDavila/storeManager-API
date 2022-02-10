const connection = require('./connection');

const checkSale = async (id) => {
  const query = 'SELECT id FROM StoreManager.sales WHERE id = ?';
  const [[sale]] = await connection.execute(query, [id]);
  return sale;
};

const createSaleProducts = async (products) => {
  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id,quantity) VALUES ?';
  await connection.query(query, [products]);
};

const create = async (products) => {
  const query = 'INSERT INTO sales (id) VALUES (DEFAULT)';
  const [{ insertId: id }] = await connection.execute(query);
  await createSaleProducts(
    products.map(({ product_id: prodId, quantity }) => [id, prodId, quantity]),
  );
  return { id };
};

const getAll = async () => {
  const query = `SELECT sale_id, product_id, quantity, date 
  FROM sales_products AS sp JOIN sales AS s 
  ON sp.sale_id = s.id`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async (id) => {
  const query = `SELECT product_id, quantity, date 
  FROM sales_products AS sp JOIN sales AS s 
  ON sp.sale_id = s.id WHERE sale_id = ?`;
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

const update = async (id, { productId, quantity }) => {
  const query = `UPDATE sales_products 
  SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
  await connection.execute(query, [quantity, id, productId]);
};

const del = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  checkSale,
  del,
};