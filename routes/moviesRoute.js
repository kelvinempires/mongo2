import express, { json } from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
const router = express.Router();

//getting all movies to and setting the limit to 10
router.get("/", async (req, res) => {
  const collection = db.collection("movies");
  const movies = await collection.find({}).limit(10).toArray();
  res.json(movies);
});

//getting a single movie using its id
router.get("/:id", async (req, res) => {
  if (req.params.id.length !== 24) {
    res.status(400).json({ massage: "invalid id" });
  }
  const userId = new ObjectId(req.params.id);
  const collection = db.collection("movies");
  const movies = await collection.findOne({ _id: userId });
  res.status(200).json(movies);
});

//lets create a new movie user
router.post("/", async (req, res) => {
  const collection = db.collection("movies");
  const result = await collection.insertOne(req.body);
  res.status(201).json(result);
});

//now let update a user by its id
router.put("/:id", async (req, res) => {
  const movieId = ObjectId.createFromHexString(req.params.id);
  const collection = db.collection("movies");
  const result = await collection.replaceOne({ _id: movieId }, req.body);
  if (result.acknowledged === true) {
    res.status(200).json({ massage: "movie updated successfully" });
    console.log("successful");
  } else {
    res.status(500).json({ massage: "user not found" });
    console.log("not successful");
  }
});

//this time we are updating a user without deleting the whole properties
router.patch("/:id", async (req, res) => {
  const movieId = ObjectId.createFromHexString(req.params.id);
  const collection = db.collection("movies");
  const result = await collection.replaceOne({ _id: movieId }, req.body);
  if (result.acknowledged === true) {
    res.status(200).json({ massage: "movie updated successfully" });
    console.log("successful");
  } else {
    res.status(500).json({ massage: "user not found" });
    console.log("not successful");
  }
});

//looks great!we"ve done wonderfully well so far, now lets delete a document using its id
router.delete("/:id", async (req, res) => {
  const movieId = ObjectId.createFromHexString(req.params.id);
  const collection = db.collection("movies");
  const result = await collection.deleteOne({ _id: movieId });
   if (result.acknowledged === true) {
     res.status(200).json({ massage: "movie has been deleted successfully" });
     console.log("successful");
   } else {
     res.status(500).json({ massage: "movie not found" });
     not("not successful");
   }
});
export default router;
