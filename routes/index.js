const express = require("express");
//const auth = require("../middleware/auth")
const router = express.Router();



router.use('/', require('./swagger'))
router.use('/users', require('./users'))

module.exports = router;
