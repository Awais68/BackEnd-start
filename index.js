import express from "express";
import morgan from "morgan";
import userRoutes from "./routers/users.js";
import courses from "./routers/courses.js";

const app = express();
const PORT = 4000;

const tasks = [
  {
    id: 1,
    task: "Sona nh hai ",
    completed: false,
  },
  {
    id: 2,
    task: "Jagna Hai  ",
    completed: false,
  },
  {
    id: 3,
    task: "Concept Samjna hai  ",
    completed: false,
  },
];

app.use(morgan("tiny"));
app.use(express.json()); // ye middleware  ap ki body ko json me convert kr deta hai

//application level middleware

function middleware(req, res, next) {
  // console.log("MiddleWare==> ", Date.now())
  (req.requestBy = "Awais Niaz "),
    res.status(500).send("System is not Responding"); // is function se app agy nh jay gi Qk middleware puri app me laga hua hai
  next();
}

// app.use(middleware); // ye middleware puri app pr hai

app.get("/", (req, res) => {
  console.log("req.requestBy=>", req.requestBy);
  // console.log("REQUEST=>", req)
  res.status(200).send(tasks); //("Hello World WellCome To  API")
});

// params => dynamic route and part of url, iske bager api complete nh hogi
app.get("/singleTask/:id", (req, res) => {
  const task = tasks.find((data) => data.id == req.params.id);
  if (!task) return res.status(404).send("Task not Found ");
});
// review Again please ...
// query app.get
app.get("/singleTask/:id", (req, res) => {
  console.log("req.Qurey=> ", req.query);
  const { completed } = req.query;
  const filter = tasks;
  if (completed)
    filter = tasks.filter((data) =>
      completed == "1 " ? data.completed == true : data.completed == false
    );
  res.status(200).send(filter);
});

// app.use("/user", userRoutes);
// app.use("/courses", userRoutes);

// app.post("/", (req, res) => {
//   console.log("REQUEST.body=>", req.body);
//   res.send("POST REQUEST IS CALLED ");
// });

// app.put("/", (req, res) => {
//   console.log("REQUEST.body=>", req.body);
//   res.send("PUT REQUEST IS CALLED ");
// });

// app.delete("/", (req, res) => {
//   console.log("REQUEST.body=>", req.body);
//   res.send("Delete REQUEST IS CALLED ");
// });

app.listen(PORT, () => console.log("server is running on PORT " + PORT));
