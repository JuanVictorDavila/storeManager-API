const productsModel = require('../../models/productsModel');

const create = async ({ name, description, category, manufacturer, price, quantity }) => {  
  const product = await productsModel.getByName(name);
  if (product) return { error: { code: 'alreadyExists', message: 'Product already exists' } };

  const { id } = await productsModel.create(
    { 
      name,
      description,
      category,
      manufacturer,
      price,
      quantity,
    },
  );
  return { id, name, description, category, manufacturer, price, quantity };
};

module.exports = create;