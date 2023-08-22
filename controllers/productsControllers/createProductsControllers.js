const createProductsService = require('../../services/productsServices/createProductsService');

const create = async (req, res, next) => {
  const { name, description, category, manufacturer, price, quantity } = req.body;
  const product = await createProductsService(
    { 
      name,
      description,
      category,
      manufacturer,
      price,
      quantity,
    },
  );

  if (product.error) return next(product.error);
  
  res.status(201).json(product);
};

module.exports = create;