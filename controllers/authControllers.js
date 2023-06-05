require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;
const asyncHandler = require("express-async-handler");

// @desc   Register new user
// @route  POST users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(400).send({ message: "Please add missing field..." });
    throw new Error("Please add missing field...");
  }

  //Check if email or username already registered
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) {
    res.status(400).send({ message: "Email already registered..." });
    throw new Error("Email already registered");
  } else if (usernameExists) {
    res.status(400).send({ message: "Username already registered..." });
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
    //generate token
    const token = generateToken(user._id);

    //keep neccessary user data
    const userData = filterUserData(user);

    //respond with userData and token
    res.status(200).json({ userData, token });
  } else {
    res
      .status(400)
      .send({ message: "Unable to SignUp , please try again later..." });
    throw new Error("Unable to SignUp...");
  }
});

// @desc   Login User
// @route  POST users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Search for email in DB
  const user = await User.findOne({ email });

  //if email is found check password match in DB
  if (user && (await bcrypt.compare(password, user.password))) {
    //generate token
    const token = generateToken(user._id);

    //keep neccessary user data
    const userData = filterUserData(user);

    //respond with userData and token
    res.status(200).json({ userData, token });
  } else {
    res.status(400);
    res.send({ message: "Invalid credentials" });
    throw new Error("Invalid credentials...");
  }
});

//Exlude password and email from user object
const filterUserData = (user) => {
  return {
    _id: user._id,
    username: user.username,
    profileImage: user.profileImage,
    profileInfo: user.profileInfo,
  };
};

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { registerUser, loginUser };
