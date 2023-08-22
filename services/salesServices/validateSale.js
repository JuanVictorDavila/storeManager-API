const saleSchema = require('../../schemas/saleSchema');

const validateSale = (products) => {
  for (let i = 0; i < products.length; i += 1) {
    const aux = { 
      productId: products[i].product_id,
      quantity: products[i].quantity, 
    };
    const validation = saleSchema.validate(aux);
    if (validation.error) return validation;
  }
  return {};
};

module.exports = validateSale;