const express = require('express');
const router = express.Router();
const validation = require("../middleware/validation");
const auth = require("../middleware/auth")
const teamsController = require('../controllers/teams');

router.get('/',  auth.ensureAuth, teamsController.getAll);

router.get('/:id',  auth.ensureAuth, teamsController.getSingle);

router.post('/',  auth.ensureAuth, validation.newTeam, teamsController.createTeam);

router.put('/:id',  auth.ensureAuth, validation.newTeam, teamsController.updateTeam);

router.delete('/:id',  auth.ensureAuth, teamsController.deleteTeam); 

module.exports = router;