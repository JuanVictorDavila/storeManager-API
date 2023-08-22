const serialize = (sales) => sales.map((sale) => {
  const { sale_id: saleId, ...rest } = sale;
  return { saleId, ...rest };
});

module.exports = serialize;