const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const { cloudinary } = require("../utils/cloudinary");

//@desc   Upload profile image
//@route  Post /profile/uploadImage
//@access Private
const uploadImage = asyncHandler(async (req, res) => {
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
  const user = await User.findByIdAndUpdate(userId, {
    profileImage: uploadResponse.secure_url,
  }); 

  if (!user) {
    res.status(500);
    throw new Error("Something went wrong...");
  }
  res.json({ msg: "Profile Picture successfully updated!" });
});

module.exports = {
  uploadImage,
};
