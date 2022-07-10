const jtw = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
    try {
      //Get token from header
      token = authorizationHeader.split(" ")[1];
      //Verify token
      const decodedToken = jtw.verify(token, process.env.JTW_SECRET);
      //Get user fom token
      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized.");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No authorized, no token");
  }
});

module.exports = { protect };
