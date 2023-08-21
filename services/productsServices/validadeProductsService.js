const productSchema = require('../../schemas/productSchema');

const validateProducts = ({ name, description, category, manufacturer, price, quantity }) => {
  const validation = productSchema.validate(
    { 
      name,
      description,
      category,
      manufacturer,
      price,
      quantity,
    },
  );
  return validation;
};

module.exports = validateProducts;