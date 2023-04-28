//middleware for handling exceptions. read more : https://www.npmjs.com/package/express-async-handler
const asyncHandler = require("express-async-handler");
const User = require("../../models/UserModel");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if(users){
    res.status(201).send(users)
  }else{
    res.status(400);
    throw new Error("Cannot retrieve users list")
  }
});

module.exports = {getAllUsers};
