import express from "express";
import db from "./db/conn.js";
import moviesRoute from "./routes/moviesRoute.js"
import usersRoute from "./routes/userRoute.js"
import dbConnection from "./db/conn.js";
import DogRoute from "./routes/DogsRoute.js";

const app = express();
const port = 3000;
app.use(express.json())
await dbConnection()

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/movies", moviesRoute)
app.use("/users", usersRoute)
app.use("/Dog", DogRoute)


app.listen(port, () =>
  console.log(`server is running on port http://localhost:${port}`)
);
