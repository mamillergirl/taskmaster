const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// const passwordUtil = require('../util/passwordComplexityCheck');

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db("taskmaster")
        .collection('task')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
};

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid task id to find a task.');
    }
    const taskId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db("taskmaster")
        .collection('task')
        .find({ _id: taskId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const createTask = async (req, res) => {
    
    const task = {
        taskName: req.body.taskName,
        taskInitiator: req.body.taskInitiator,
        taskStartdate: req.body.taskStartdate,
        responsiblePerson: req.body.responsiblePerson,
        taskDeadline: req.body.taskDeadline,
        taskOutcome: req.body.taskOutcome,
        assignedTeam: req.body.assignedTeam
    };

    const response = await mongodb.getDb().db("taskmaster").collection('task').insertOne(task);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the task.');
    }
};

const updateTask = async (req, res) => {
    const taskId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const task = {
        taskName: req.body.taskName,
        taskInitiator: req.body.taskInitiator,
        taskStartdate: req.body.taskStartdate,
        responsiblePerson: req.body.responsiblePerson,
        taskDeadline: req.body.taskDeadline,
        taskOutcome: req.body.taskOutcome,
        assignedTeam: req.body.assignedTeam
    };
    const response = await mongodb
        .getDb()
        .db("taskmaster")
        .collection('task')
        .replaceOne({ _id: taskId }, task);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the task.');
    }
};

const deleteTask = async (req, res) => {
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb
    .getDb()
    .db("taskmaster")
    .collection('task')
    .remove({ _id: taskId }, true);
    console.log(response);

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the task.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createTask,
    updateTask,
    deleteTask
};
