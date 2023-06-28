const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const { cloudinary } = require("../utils/cloudinary");
const { filterUserData } = require("../utils/userUtils");

//@desc   Upload profile image
//@route  Post /profile/setImage
//@access Private
const setImage = asyncHandler(async (req, res) => {
  const { userId, profileImage } = req.body;

  if (!userId || !profileImage) {
    res.status(400);
    throw new Error("Unable to upload photo...");
  }

  //send image to cloudinary
  const uploadResponse = await cloudinary.uploader.upload(profileImage);
  if (!uploadResponse) {
    res.status(400);
    throw new Error("Unable to upload photo...");
  }

  //update user profile photo
  const user = await User.findByIdAndUpdate(
    userId,
    {
      profileImage: uploadResponse.secure_url,
    },
    {
      new: true,
    }
  );

  if (!user) {
    res.status(500);
    throw new Error("Something went wrong...");
  }
  const filteredUser = filterUserData(user);
  res.status(201).json(filteredUser);
});

//@desc   Update profile info text
//@route  Post /profile/setInfo
//@access Private
const setInfo = asyncHandler(async (req, res) => {
  const { userId, userInfo } = req.body;

  if (!userInfo) {
    res.status(400);
    throw new Error("Unable to update user info...");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      profileInfo: userInfo,
    },
    {
      new: true,
    }
  );

  if (!user) {
    res.status(500);
    throw new Error("Something went wrong...");
  }

  const filteredUser = filterUserData(user);
  res.status(201).json(filteredUser);
});

module.exports = {
  setImage,
  setInfo,
};
