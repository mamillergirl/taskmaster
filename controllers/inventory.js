const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll =  (req, res) => {
  mongodb.getDb()
  .db("taskmaster")
  .collection("inventory")
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
    res.status(400).json('Must use a valid inventory id to find a inventory.');
  }
  const inventoryId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("taskmaster")
    .collection("inventory")
    .find({ _id: inventoryId })
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

const createInventory = async (req, res) => {
    const inventory = {
        productCategory: req.body.productCategory,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        brand: req.body.brand,
        countryOrigin: req.body.countryOrigin,
        productWidth: req.body.productWidth,
        productHeight: req.body.productHeight,
        productVolume: req.body.productVolume,
        productWeight: req.body.productWeight,
        packType: req.body.packType,
        expiryDate: req.body.expiryDate,
        dateCreation: req.body.dateCreation
    };

  const response = await mongodb
    .getDb()
    .db("taskmaster")
    .collection("inventory")
    .insertOne(inventory)
  if (response.acknowledged){
    res.status(201).json(response);
  }
  else {
    res.status(500).json(response.error);
  }
};

const updateInventory = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid inventory id to find a inventory.');
  }
  const inventory = {
    productCategory: req.body.productCategory,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    brand: req.body.brand,
    countryOrigin: req.body.countryOrigin,
    productWidth: req.body.productWidth,
    productHeight: req.body.productHeight,
    productVolume: req.body.productVolume,
    productWeight: req.body.productWeight,
    packType: req.body.packType,
    expiryDate: req.body.expiryDate,
    dateCreation: req.body.dateCreation
};

  const inventoryId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("taskmaster")
    .collection("inventory")
    .replaceOne({ _id: inventoryId }, inventory);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Unable to update inventory.');
    }
  }
  const deleteInventory = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid inventory id to find a inventory.');
    }
    const inventoryId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("taskmaster")
      .collection("inventory")
      .deleteOne( { "_id" : inventoryId} );
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'Unable to delete inventory.');
      }
  };
  
module.exports = { getAll, getSingle, createInventory, updateInventory, deleteInventory};
