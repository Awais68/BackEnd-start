import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";
import sendResponse from "../helpers/sendResponse.js";

export async function authenticateUser(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    console.log("bearer token", bearerToken);

    if (!bearerToken) {
      return sendResponse(res, 400, null, true, "Token not provided");
    }

    const token = bearerToken.split(" ")[1];
    let decoded = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return sendResponse(res, 401, null, true, "Invalid token");
  }
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

