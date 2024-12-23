import express from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose, { connect } from "mongoose";
import taskRoutes from "./routers/tasks.js";
import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/users.js";

import jwt from "jsonwebtoken";
import { authenticateUser } from "./middleware/authentication.js";

const uri = "mongodb://localhost:27017/myDatabase";

const app = express();
const PORT = 4000;

console.log("MONGODBUrl=>", process.env.MONGODBURI);

app.use(morgan("tiny"));
app.use(express.json()); // ye middleware  ap ki body ko json me convert kr deta hai.

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("mongoDB Connected "))
  .catch((err) => console.log("err=>", err));

app.get("/", (req, res) => res.send("Server is running..."));

app.use("/task", authenticateUser, taskRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => console.log("server is running on PORT " + PORT));
