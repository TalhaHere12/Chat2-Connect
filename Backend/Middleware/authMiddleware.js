const jwt = require("jsonwebtoken");
const User=require('../Models/userModel')
const asyncHandler = require("express-async-handler");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("token",token)
      //decodes token id
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      console.log("Decoded token",decoded)
    
      const user = await User.findById(decoded.id).select("-password");
      console.log("Decoded User",user)
      console.log("Decoded Id",decoded.id)
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
module.exports = { protect };