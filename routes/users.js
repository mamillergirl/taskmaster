const express = require('express');
const router = express.Router();
const validation = require("../middleware/validation");
const auth = require("../middleware/auth")

const usersController = require('../controllers/users');

router.get('/',  auth.ensureAuth, usersController.getAll);

router.get('/:id',  auth.ensureAuth, usersController.getSingle);

router.put('/:id',  auth.ensureAuth, validation.newUserInfo, usersController.updateUser);

router.delete('/:id',  auth.ensureAuth, usersController.deleteUser); 

module.exports = router;