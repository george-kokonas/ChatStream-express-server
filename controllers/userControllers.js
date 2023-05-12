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
  res.status(200).send(user);
});

//@desc   Get user data
//@route  Get /user/getRegisteredUsers
//@access Private
const getRegisteredUsers = asyncHandler(async(req,res) => {
  const users = await User.find();

  if(!users || users.length === 0 ){
    res.status(404);
    throw new Error("No users found");
  }
  res.send(users)
})

module.exports = {
  getUser,
  getRegisteredUsers,
}; 
 