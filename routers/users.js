import express from "express";
const router = express.Router();
const users = [
  {
    fullname: "Awais",
    email: "awaisniaz720@gmail.com",
    id: 1,
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    error: false,
    data: users,
    msg: "Users fetched Successfully",
  });
});

router.post("/", (req, res) => {
  const { fullname, email } = req.body;
  users.push({ fullname, email, id: users.length + 1 });
  res.status(201).json({
    error: false,
    data: users,
    msg: "Users Added Successfully",
  });
});
// Search Params  / k bad : dynamic id means change honi wali 
router.get("/:id", (req, res) => {
  const user = users.find((data) => data.id == req.params.id);
  if (!user) {
    res.status(404).json({
      error: true,
      data: null,
      msg: "User not Please ReTry",
    });
  }
  res.status(200).json({
    error: false,
    data: user,
    msg: "USER found Successfully",
  });
});


export default router;
