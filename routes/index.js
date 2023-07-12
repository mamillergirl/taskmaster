const express = require("express");
const auth = require("../middleware/auth")
const router = express.Router();



router.use('/',  require('./swagger'))
router.use('/users',  auth.ensureAuth, require('./users'))
router.use('/inventory',  auth.ensureAuth, require('./inventory'))
router.use('/teams',  auth.ensureAuth, require('./teams'))
router.use('/tasks',  auth.ensureAuth, require('./tasks'))
router.use('/google', require('./google'))

module.exports = router;
