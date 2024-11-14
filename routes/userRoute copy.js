import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
const router = express.Router();

//getting all user with the limit 10
router.get("/", async (req, res) => {
  const collection = db.collection("users");
  const users = await collection.find().limit(10).toArray();
  res.json(users);
});

//get user by id using findOne
router.get("/:id", async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const collection = db.collection("users");
  const users = await collection.findOne({ _id: userId });
  res.status(200).json(users);
});

//creating new user
router.post("/", async (req, res) => {
  const collection = db.collection("users");
  const result = await collection.insertOne(req.body);
  res.status(201).json(result);
});

//updating a user by id
router.put("/:id", async (req, res) => {
  if (res.params.id.length !== 24) {
    res.status(400).json({ massage: "invalid id" });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const collection = db.collection("users");
  const result = await collection.replaceOne({ _id: userId }, req.body);
  if (result.modifiedCount === 1) {
    res.status(200).json({ massage: "user updated successfully" });
  } else {
    res.status(500).json({ massage: "user not found" });
  }
});

//deleting a user from the database
router.delete("/:id", async (req, res) => {
  if (res.params.id.length !== 24) {
    res.status(400).json({ massage: "invalid id" });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const collection = db.collection("users");
  const result = await collection.deleteOne({ _id: userId });
  if (result.acknowledged === true) {
    res.status(200).json({ massage: "user deleted successfully" });
  } else {
    res.status(500).json({ massage: "user not found" });
  }
});
export default router;
