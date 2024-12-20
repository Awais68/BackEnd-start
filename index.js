import express from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose, { connect } from "mongoose";


const app = express();
const PORT = 4001;

// console.log("MONGODBUrl=>", process.env.MONGODBURI);

app.use(morgan("tiny"));
app.use(express.json()); // ye middleware  ap ki body ko json me convert kr deta hai.

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("mongoDB Connected "))
  .catch((err) => console.log("err=>", err));

app.get("/", (req, res) => res.send("Server is running..."));

app.listen(PORT, () => console.log("server is running on PORT " + PORT));
