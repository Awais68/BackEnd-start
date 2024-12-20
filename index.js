import express from "express";
import morgan from "morgan";
import userRoutes from "./routers/users.js";
import courses from "./routers/courses.js";

const app = express();
const PORT = 4001;

app.use(morgan("tiny"));
app.use(express.json()); // ye middleware  ap ki body ko json me convert kr deta hai

app.get("/", (req, res) => res.send("Server is running..."));

app.listen(PORT, () => console.log("server is running on PORT " + PORT));
