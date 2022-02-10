const express = require('express');
const rescue = require('express-rescue'); // REF rescue-express https://www.npmjs.com/package/express-rescue

const salesControllers = require('../controllers/salesControllers');

const router = express.Router();

router.post('/', rescue(salesControllers.validateSale), rescue(salesControllers.create));
router.get('/', rescue(salesControllers.getAll));
router.get('/:id', rescue(salesControllers.getById));
router.put('/:id', rescue(salesControllers.validateSale), rescue(salesControllers.update));
router.delete('/:id', rescue(salesControllers.remove));

module.exports = router;