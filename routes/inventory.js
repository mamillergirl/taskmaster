const express = require('express');
const auth = require("../middleware/auth")
const router = express.Router();

const inventoryController = require('../controllers/inventory');

router.get('/',  auth.ensureAuth, inventoryController.getAll);

router.get('/:id',  auth.ensureAuth, inventoryController.getSingle);

router.post('/',  auth.ensureAuth, inventoryController.createInventory);

router.put('/:id',  auth.ensureAuth, inventoryController.updateInventory);

router.delete('/:id',  auth.ensureAuth, inventoryController.deleteInventory);

module.exports = router;