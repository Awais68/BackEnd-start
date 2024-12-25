import sendResponse from "../helpers/sendResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";

export async function authenticateUser(req, res, next) {
  // console.log("authorization=>", req.headers.authorization);
  const bearerToken = req.headers.authorization;
  if (!bearerToken)
    return sendResponse(res, 400, null, true, "Token not provided");
  const token = bearerToken.split(" ")[1];
  let decoded = jwt.verify(token, process.env.AUTH_SECRET);

  req.user = decoded;
  next();
}

//ADMIN
export async function authenticateAdmin(req, res, next) {
  const bearerToken = req.headers?.authorization;

  if (!bearerToken)
    return sendResponse(res, 403, null, true, "Token not provided");

  const token = bearerToken.split(" ")[1];

  const decoded = jwt.verify(token, process.env.AUTH_SECRET);

  if (decoded.role == "admin") {
    req.user = decoded;
    next();
  } else {
    return sendResponse(res, 403, null, true, "Admin only allowed to access");
  }
}
