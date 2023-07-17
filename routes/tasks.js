const express = require("express");
const auth = require("../middleware/auth")
const validation = require("../middleware/validation");
const router = express.Router();

const tasksController = require("../controllers/tasks");

router.get("/",  auth.ensureAuth, tasksController.getAll);

router.get("/:id",  auth.ensureAuth, tasksController.getSingle);

router.post("/",  auth.ensureAuth, validation.newTask, tasksController.createTask);

router.put("/:id",  auth.ensureAuth, validation.newTask, tasksController.updateTask);

router.delete("/:id",  auth.ensureAuth, tasksController.deleteTask);

module.exports = router;
