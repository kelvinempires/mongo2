import { MongoClient, ServerApiVersion } from "mongodb";
// import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI || "";

// mongoose.connect(connectionString);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let conn;
try {
  conn = await client.connect();
  console.log("mongo connected");
} catch (e) {
  console.error(e);
}

let db = conn.db("sample_mflix");

export default db;
