const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = asyncHandler(async (req, res, next) => {

  let token = null;
  const headerAuth = req.headers.authorization;

  //headers.authorization contains JWT
  if (headerAuth && headerAuth.startsWith("Bearer")) {
    try {
      //Get token from header
      token = headerAuth.split(" ")[1];

      //Verify token and get id 
      const decoded = jwt.verify(token, JWT_SECRET);

      //Get user from token and exclude the password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = auth;
