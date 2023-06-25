const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll =  (req, res) => {
  mongodb.getDb()
  .db("taskmaster")
  .collection("team")
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
    res.status(400).json('Must use a valid team id to find a team.');
  }
  const teamId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("taskmaster")
    .collection("team")
    .find({ _id: teamId })
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
  const response = await mongodb
    .getDb()
    .db("taskmaster")
    .collection("team")
    .insertOne(team)
  if (response.acknowledged){
    res.status(201).json(response);
  }
  else {
    res.status(500).json(response.error);
  }
};

const updateTeam = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid team id to find a team.');
  }
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
  const teamId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("taskmaster")
    .collection("team")
    .replaceOne({ _id: teamId }, team);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Unable to update team.');
    }
  }
  const deleteTeam = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid team id to find a team.');
    }
    const teamId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("taskmaster")
      .collection("team")
      .deleteOne( { "_id" : teamId} );
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'Unable to delete team.');
      }
  };
  
module.exports = { getAll, getSingle, createTeam, updateTeam, deleteTeam };
