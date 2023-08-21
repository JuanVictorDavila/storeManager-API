const express = require('express');
const rescue = require('express-rescue');

const validateProducts = require('../controllers/productControllers/validadeProductsControllers')
const createProducts = require('../controllers/productControllers/createProductsControllers')
const getAllProducts = require('../controllers/productControllers/getAllProductsControllers')
const getByIdProducts = require('../controllers/productControllers/getByIdProductsControllers')
const updateProducts = require('../controllers/productControllers/updateProductsControllers')
const removeProducts = require('../controllers/productControllers/removeProductsControllers')

const router = express.Router();

router.get('/', rescue(getAllProducts));
router.get('/:id', rescue(getByIdProducts));
router.put('/:id', rescue(validateProducts), rescue(updateProducts));
router.delete('/:id', rescue(removeProducts));
router.post('/', rescue(validateProducts), rescue(createProducts));

module.exports = router;