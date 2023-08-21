const productsService = require('../../services/productsService');

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, category, manufacturer, price, quantity } = req.body;
  const product = await productsService.update(
    id, 
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
  res.status(200).json(product);
};

module.exports = update;