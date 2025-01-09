import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";
import Students from "../models/Students.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { course, aboveAge, city } = req.query;
  const query = {};

  if (course && course !== "all") query.course = course.toString();
  if (aboveAge) query.age = { $gte: parseInt(aboveAge) };
  if (city && city !== "all") query.city = city;
  const students = await Students.find(query).populate("courses", "title");
  const studentsCount = await Students.find(query).countDocuments();

  const studentsByCourse = await Students.aggregate([
    {
      $match: query,
    },
    {
      $group: { _id: "$course", totalQuantity: { $sum: 1 } },
    },
    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
  ]);
  sendResponse(
    res,
    200,
    { count: studentsCount, students, studentsByCourse },
    false,
    "Students Fetched Successfully"
  );
});

export default router;
