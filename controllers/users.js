const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// const passwordUtil = require('../util/passwordComplexityCheck');

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('user')
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
        res.status(400).json('Must use a valid user id to find a user.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('user')
        .find({ _id: userId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const createUser = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
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

    const response = await mongodb.getDb().db().collection('user').insertOne(user);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
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
        .db()
        .collection('user')
        .replaceOne({ _id: userId }, user);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
    .getDb()
    .db()
    .collection('user')
    .remove({ _id: userId }, true);
    console.log(response);

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
