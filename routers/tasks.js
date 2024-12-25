import express from "express";
const router = express.Router();
import Task from "../models/Task.js";
import sendResponse from "../helpers/sendResponse.js";

router.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    let newTask = new Task({ task });
    newTask = await newTask.save();
    sendResponse(res, 201, newTask, false, "Task added Successfully");
  } catch (err) {
    console.error("Error adding task:", err.message);
    sendResponse(res, 500, null, true, "Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
      return sendResponse(res, 404, null, true, "Tasks Not Found");
    }
    sendResponse(res, 200, tasks, false, "Tasks retrieved successfully");
  } catch (err) {
    console.error("Error retrieving tasks:", err.message);
    sendResponse(res, 500, null, true, "Internal Server Error");
  }
});

export default router;
