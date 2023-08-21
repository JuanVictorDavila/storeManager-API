const productsService = require('../../services/productsService');

const validateProducts = (req, _res, next) => {
  const { name, description, category, manufacturer, price, quantity } = req.body;
  const validation = productsService.validateProducts({ 
    name, 
    description, 
    category,
    manufacturer,
    price, 
    quantity, 
  });
  
  if (validation.error) return next(validation.error);
  
  next();
};

module.exports = validateProducts;