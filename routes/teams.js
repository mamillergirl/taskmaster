const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const teamsController = require('../controllers/teams');

router.get('/',  auth.ensureAuth, teamsController.getAll);

router.get('/:id',  auth.ensureAuth, teamsController.getSingle);

router.post('/',  auth.ensureAuth, teamsController.createTeam);

router.put('/:id',  auth.ensureAuth, teamsController.updateTeam);

router.delete('/:id',  auth.ensureAuth, teamsController.deleteTeam); 

module.exports = router;