const User = require("../models/UserModel");
const { filterUserData } = require("../utils/userUtils");

//@desc   Get user data
//@route  Get /user/getUser
//@access Private
const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found..." });
    } else {
      const filteredUser = filterUserData(user);
      res.status(200).json(filteredUser);
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//@desc   Get all registered users data
//@route  Get /user/getRegisteredUsers
//@access Private
const getRegisteredUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      res.status(404).json({ error: "No users found" });
    } else {
      const filteredUsers = users.map((user) => filterUserData(user));
      res.status(200).json(filteredUsers);
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

module.exports = {
  getUser,
  getRegisteredUsers,
};
