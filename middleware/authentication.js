import sendResponse from "../helpers/sendResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";

export async function authenticateUser(req, res, next) {
  try {
    console.log("authorization=>", req.headers.authorization);
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    if (!token) return sendResponse(res, 403, null, true, "Token not provided");
    let decoded = jwt.verify(token, process.env.AUTH_SECRET);
    if (decoded) {
        const user = await User.findById(decoded._id)
        if(!user)return sendResponse(res, 403, null, true, "User not Found");
      req.user = decoded;
      next();
    } else {
      sendResponse(res, 500, null, true, "Something went wrong");
    }
  } catch (err) {
    console.error("Error:", err.message);
    sendResponse(res, 500, null, true, "Something went wrong");
  }
}
