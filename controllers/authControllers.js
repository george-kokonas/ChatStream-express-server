require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

const User = require("../models/UserModel");
const { filterUserData } = require("../utils/userUtils");

// @desc   Register new user
// @route  POST users/register
// @access Public
const registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Please add missing field..." });
    }

    // Check if email or username is already registered
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists) {
      return res.status(400).json({ message: "Email already registered..." });
    } else if (usernameExists) {
      return res
        .status(400)
        .json({ message: "Username already registered..." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    if (user) {
      // Generate token
      const token = generateToken(user._id);

      // Keep necessary user data
      const userData = filterUserData(user);

      // Respond with userData and token
      res.status(200).json({ userData, token });
    } else {
      return res.status(400).json({
        message: "Unable to SignUp, please try again later...",
      });
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

// @desc   Login User
// @route  POST users/login
// @access Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Search for email in DB
    const user = await User.findOne({ email });

    // If email is found, check password match in DB
    if (user && bcrypt.compare(password, user.password)) {
      // Generate token
      const token = generateToken(user._id);
      // Keep necessary user data
      const userData = filterUserData(user);

      // Respond with userData and token
      res.status(200).json({ userData, token });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    // Pass the error to the next middleware for handling
    next(error);
  }
};

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { registerUser, loginUser };
