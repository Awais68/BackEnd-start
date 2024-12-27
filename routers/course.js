import express from "express";
import Course from "../models/Course.js";
import sendResponse from "../helpers/sendResponse.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/authentication.js";

const router = express.Router();

const users = [
  {
    fullname: "Awais",
    email: "awaisniaz720@gmail.com",
    id: 1,
  },
];

router.get("/",  authenticateUser, async (req, res) => {
  try {
    const user = req.user
    console.log("user>", user);
  
    const course = await Course.find();
    if(course) sendResponse(res, 200, course, false, "Course Fetched Successfully ");
    sendResponse (res, 400, null, true, "course not found"  )
    
  } catch (error) {
    // sendResponse (res, 400, null, true, "inavalid"  )
  }
});

router.post("/", authenticateAdmin, async (req, res) => {
  let course = new course(req.body);
  course = await course.save();
  sendResponse(res, 200, course, false, "Course Added Successfully ");
});
// // Search Params  / k bad : dynamic id means change honi wali
// router.get("/:id", (req, res) => {
//   const user = users.find((data) => data.id == req.params.id);
//   if (!user) {
//     res.status(404).json({
//       error: true,
//       data: null,
//       msg: "User not Please ReTry",
//     });
//   }
//   res.status(200).json({
//     error: false,
//     data: user,
//     msg: "USER found Successfully",
//   });
// });

export default router;
