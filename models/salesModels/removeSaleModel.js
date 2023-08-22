const connection = require('../connection/connection');

const remove = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = remove;