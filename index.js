import express from "express";
import db from "./db/conn.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/movies", async (req, res) => {
  const collection = db.collection("movies");
  const movies = await collection.find({}).limit(10).toArray();
  res.json(movies);
});

app.get("/users", async (req, res) => {
  const collection = db.collection("users");
  const users = await collection.find().limit(10).toArray();
  res.json(users);
});

app.listen(port, () =>
  console.log(`server is running on port http://localhost:${port}`)
);
