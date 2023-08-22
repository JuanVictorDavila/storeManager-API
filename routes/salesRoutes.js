const express = require('express');
const rescue = require('express-rescue');

const validateSaleController = require('../controllers/salesControllers/validateSalesController')
const createSalesController = require('../controllers/salesControllers/createSalesController')
const getAllSalesController = require('../controllers/salesControllers/getAllSalesController')
const getByIdSalesController = require('../controllers/salesControllers/getByIdSalesController')
const updateSalesController = require('../controllers/salesControllers/updateSalesController')
const removeSalesController = require('../controllers/salesControllers/removeSalesController')

const router = express.Router();

router.post('/', rescue(validateSaleController), rescue(createSalesController));
router.get('/', rescue(getAllSalesController));
router.get('/:id', rescue(getByIdSalesController));
router.put('/:id', rescue(validateSaleController), rescue(updateSalesController));
router.delete('/:id', rescue(removeSalesController));

module.exports = router;
