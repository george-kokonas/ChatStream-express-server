require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;
//middleware for handling exceptions. read more : https://www.npmjs.com/package/express-async-handler
const asyncHandler = require("express-async-handler");


// @desc   Register new user
// @route  POST users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  
  if (!email || !username || !password) {
    res.status(400);
    throw new Error("Please add missing field. All fields are required...");
  }
  
  //Check if email or username already registered
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });
  
  if (emailExists) {
    res.status(400);
    throw new Error("Email already registered");
  } else if (usernameExists) {
    res.status(400);
    throw new Error("Username already registered");
  }
  
  //Hash password
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  //Create user
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });
  
  if (user) {
    //Generate and respond to user with JWT and data
    const token = generateToken(user._id);
    res.status(200).send(token);
    // res.cookie("token", token, cookieOptions);
    // res.status(201).json(successResponse(user));
  } else {
    res.status(400);
    res.send({message : "Invalid credentials"})
    throw new Error("Invalid provided data...");
  }
});

// @desc   Login User
// @route  POST users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  //Search for email in DB
  const user = await User.findOne({ email });
  
  //email found and provided password matches password in DB
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.status(200).send(token);
    // res.cookie("token", token, cookieOptions);
    // res.status(201).json(successResponse(user));
  } else {
    res.status(400);
    res.send({message : "Invalid credentials"})
    throw new Error("Invalid credentials...");
  }
});

//send this response object on successfull register/login
const successResponse = (user) => {
  const response = {
    _id: user.id,
    usename: user.username,
    email: user.email,
  };
  return response;
};

//Set cookie
const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { registerUser, loginUser };
