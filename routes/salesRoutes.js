const express = require('express');
const rescue = require('express-rescue');
const validateSale = require('../controllers/salesControllers/validateSaleController')
const createSaleController = require('../controllers/salesControllers/createSaleController')
const getAllSalesController = require('../controllers/salesControllers/getAllSalesController')

const salesController = require('../controllers/salesControllers/salesController');

const router = express.Router();

router.post('/', rescue(validateSale), rescue(createSaleController));
router.get('/', rescue(getAllSalesController));
router.get('/:id', rescue(salesController.getById));
router.put('/:id', rescue(salesController.validateSale), rescue(salesController.update));
router.delete('/:id', rescue(salesController.del));

module.exports = router;
