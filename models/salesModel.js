const connection = require('./connection');

const checkSales = async (id) => {
  const query = 'SELECT id FROM StoreManager.sales WHERE id = ?';
  const [[sale]] = await connection.execute(query, [id]);

  return sale;
};

const createSalesProducts = async (products) => {
  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?';
  await connection.query(query, [products]);
};

const create = async (products) => {
  const query = 'INSERT INTO sales (id) VALUES (DEFAULT)';
  const [{ insertId: id }] = await connection.execute(query);
  await createSalesProducts(
    products.map(({ product_id: productId, quantity }) => [id, productId, quantity]),
  );

  return { id };
};

const getAll = async () => {
  const query = `SELECT sale_id, product_id, quantity, date
    FROM sales_products AS saleProduct JOIN sales AS sale ON saleProduct.sale_id = sale.id`;
  const [sale] = await connection.execute(query);

  return sale;
};

const getById = async () => {

};

const update = async () => {

};

const remove = async () => {
  
};

module.exports = {
  checkSales,
  createSalesProducts,
  create,
  getAll,
  getById,
  update,
  remove,
};