const express = require("express");
//const auth = require("../middleware/auth")
const router = express.Router();



router.use('/', require('./swagger'))
router.use('/users', require('./users'))
router.use('/inventory', require('./inventory'))
router.use('/teams', require('./teams'))
router.use('/tasks', require('./tasks'))

module.exports = router;
