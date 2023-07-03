const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const getAll =  (req, res) => {
  mongodb.getDb()
  .db("taskmaster")
  .collection("user")
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
    res.status(400).json('Must use a valid user id to find a user.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("taskmaster")
    .collection("user")
    .find({ _id: userId })
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

const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        address: req.body.address,
        interest: req.body.interest,
        occupation: {
            jobTitle: req.body.jobTitle,
            responsibilities: req.body.responsibilities,
            education: req.body.education,
            expertise: req.body.expertise,
            skills: req.body.skills,
            salary: req.body.salary
        }, 
        emergencyContact: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            address: req.body.address
        }
    };
  const response = await mongodb
    .getDb()
    .db("taskmaster")
    .collection("user")
    .insertOne(user)
  if (response.acknowledged){
    res.status(201).json(response);
  }
  else {
    res.status(500).json(response.error);
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find a user.');
  }
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    birthday: req.body.birthday,
    address: req.body.address,
    interest: req.body.interest,
    occupation: {
        jobTitle: req.body.jobTitle,
        responsibilities: req.body.responsibilities,
        education: req.body.education,
        expertise: req.body.expertise,
        skills: req.body.skills,
        salary: req.body.salary
    }, 
    emergencyContact: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address
    }
};
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("taskmaster")
    .collection("user")
    .replaceOne({ _id: userId }, user);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Unable to update user.');
    }
  }
  const deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to find a user.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("taskmaster")
      .collection("user")
      .deleteOne( { "_id" : userId} );
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'Unable to delete user.');
      }
  };
  
module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };

  

