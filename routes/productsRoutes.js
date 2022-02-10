const express = require('express');
const rescue = require('express-rescue'); // REF rescue-express https://www.npmjs.com/package/express-rescue

const productsController = require('../controllers/productsControllers'); // Passei 'Controlles' para o singular
                                                                          // para ficar no tamanho da linha :P

const router = express.Router();

router.get('/', rescue(productsController.getAll));
router.get('/:id', rescue(productsController.getById));
router.put('/:id', rescue(productsController.validateProducts), rescue(productsController.update));
router.delete('/:id', rescue(productsController.remove));
router.post('/', rescue(productsController.create));

module.exports = router;