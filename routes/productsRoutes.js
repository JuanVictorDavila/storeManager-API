const express = require('express');
const rescue = require('express-rescue');

const validateProducts = require('../controllers/productsControllers/validadeProductsControllers')
const createProducts = require('../controllers/productsControllers/createProductsControllers')
const getAllProducts = require('../controllers/productsControllers/getAllProductsControllers')
const getByIdProducts = require('../controllers/productsControllers/getByIdProductsControllers')
const updateProducts = require('../controllers/productsControllers/updateProductsControllers')
const removeProducts = require('../controllers/productsControllers/removeProductsControllers')

const router = express.Router();

router.get('/', rescue(getAllProducts));
router.get('/:id', rescue(getByIdProducts));
router.put('/:id', rescue(validateProducts), rescue(updateProducts));
router.delete('/:id', rescue(removeProducts));
router.post('/', rescue(validateProducts), rescue(createProducts));

module.exports = router;