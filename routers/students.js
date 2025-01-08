import express from "express";
import sendResponse from "../helpers/sendResponse.js";

import "dotenv/config";

import { authenticateUser } from "../middleware/authentication.js";
import User from "../models/User.js";

const router = express.Router();

router.put("/", authenticateUser, async (req, res) => {
  try {
    const { city, country } = req.body;
    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        city,
        country,
      },
      {new: true}
    ).exec(true);
    sendResponse(res, 200, user, false, "User updated Successfully");
  } catch (err) {
    console.error("Error:", err);
    sendResponse(res, 500, null, true, "Something went wrong");
  }
});


router.get("/myInfo", authenticateUser, async (req, res) => {
  try {
    const { city, country } = req.body;
    const user = await User.findOne(
      {
        _id: req.user._id,
      });
      if(user) return sendResponse(res, 200, user, false, "User updated Successfully");
    
    sendResponse(res, 400, null, true, "User nothing");
  } catch (err) {
    
    sendResponse(res, 500, null, true, "Something went wrong");
  }
});

export default router;
