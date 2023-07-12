const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")

const usersController = require('../controllers/users');

router.get('/',  auth.ensureAuth, usersController.getAll);

router.get('/:id',  auth.ensureAuth, usersController.getSingle);

router.put('/:id',  auth.ensureAuth, usersController.updateUser);

router.delete('/:id',  auth.ensureAuth, usersController.deleteUser); 

module.exports = router;