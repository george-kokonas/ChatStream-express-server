const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

//@desc   Get user data
//@route  Get /user/getUser
//@access Private
const getUser = asyncHandler(async (req, res) => {
  const {userId} = req.params;
  const user = await User.findById(userId);
  if(!user){
    res.status(404);
    console.log(0);
    throw new Error("User not found...")
  }
  console.log(1);
  res.status(200).send(user);
});

module.exports = {
  getUser,
}; 
 