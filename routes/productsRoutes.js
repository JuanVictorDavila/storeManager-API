const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', rescue(productsController.getAll));
router.get('/:id', rescue(productsController.getById));
router.put('/:id', rescue(productsController.validateProducts), rescue(productsController.update));
router.delete('/:id', rescue(productsController.del));
router.post('/', rescue(productsController.validateProducts), rescue(productsController.create));

module.exports = router;