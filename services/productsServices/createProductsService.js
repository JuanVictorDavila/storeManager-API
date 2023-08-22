const getByNameproductsModel = require('../../models/productsModels/getByNameProductsModel');
const createProductsModel = require('../../models/productsModels/createProductsModel');

const create = async ({ name, description, category, manufacturer, price, quantity }) => {  
  const product = await getByNameproductsModel(name);
  if (product) return { error: { code: 'alreadyExists', message: 'Product already exists' } };

  const { id } = await createProductsModel(
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