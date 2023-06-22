const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// const passwordUtil = require('../util/passwordComplexityCheck');

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('team')
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
        res.status(400).json('Must use a valid team id to find a team.');
    }
    const teamId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('team')
        .find({ _id: teamId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const createTeam = async (req, res) => {
    
    const team = {
        teamName: req.body.teamName,
        teamLeader: {
          oid: req.body.oid
        },
        teamMembers: {
          oid: req.body.iod
        },
        teamProfile: req.body.teamProfile,
        taskId: req.body.taskId,
        dateCreated: req.body.dateCreated
    };

    const response = await mongodb.getDb().db().collection('team').insertOne(team);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the team.');
    }
};

const updateTeam = async (req, res) => {
    const teamId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const team = {
        teamName: req.body.teamName,
        teamLeader: {
          oid: req.body.oid
        },
        teamMembers: {
          oid: req.body.iod
        },
        teamProfile: req.body.teamProfile,
        taskId: req.body.taskId,
        dateCreated: req.body.dateCreated
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('team')
        .replaceOne({ _id: teamId }, team);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the team.');
    }
};

const deleteTeam = async (req, res) => {
    const teamId = new ObjectId(req.params.id);
    const response = await mongodb
    .getDb()
    .db()
    .collection('team')
    .remove({ _id: teamId }, true);
    console.log(response);

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the team.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createTeam,
    updateTeam,
    deleteTeam
};
