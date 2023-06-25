const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll =  (req, res) => {
  mongodb.getDb()
  .db("taskmaster")
  .collection("task")
  .find()
  .toArray((err) => {
    if (err) {
      res.status(400).json({ message: err });
    }
  })
  .then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid task id to find a task.');
  }
  const taskId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("taskmaster")
    .collection("task")
    .find({ _id: taskId })
    .toArray((err) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });

};

const createTask = async (req, res) => {
    const task = {
        taskName: req.body.taskName,
        taskInitiator: req.body.taskInitiator,
        taskStartDate: req.body.taskStartDate,
        responsiblePerson: req.body.responsiblePerson,
        taskDeadline: req.body.taskDeadline,
        taskOutcome: req.body.taskOutcome,
        assignedtask: req.body.assignedtask
    };
  const response = await mongodb
    .getDb()
    .db("taskmaster")
    .collection("task")
    .insertOne(task)
  if (response.acknowledged){
    res.status(201).json(response);
  }
  else {
    res.status(500).json(response.error);
  }
};

const updateTask = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid task id to find a task.');
  }
  const task = {
    taskName: req.body.taskName,
    taskInitiator: req.body.taskInitiator,
    taskStartDate: req.body.taskStartDate,
    responsiblePerson: req.body.responsiblePerson,
    taskDeadline: req.body.taskDeadline,
    taskOutcome: req.body.taskOutcome,
    assignedtask: req.body.assignedtask
};
  const taskId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("taskmaster")
    .collection("task")
    .replaceOne({ _id: taskId }, task);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Unable to update task.');
    }
  }
  const deleteTask = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to find a task.');
    }
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("taskmaster")
      .collection("task")
      .deleteOne( { "_id" : taskId} );
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'Unable to delete task.');
      }
  };
  
module.exports = { getAll, getSingle, createTask, updateTask, deleteTask };
