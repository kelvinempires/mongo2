import express from "express";
import db from "./db/conn.js";
import moviesRoute from "./routes/moviesRoute.js"
import usersRoute from "./routes/userRoute.js"

const app = express();
const port = 3000;
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/movies", moviesRoute)
app.use("/users", usersRoute)

app.listen(port, () =>
  console.log(`server is running on port http://localhost:${port}`)
);
