const User = require("../models/UserModel");
const { cloudinary } = require("../utils/cloudinary");
const { filterUserData } = require("../utils/userUtils");

//@desc   Upload profile image
//@route  Post /profile/setImage
//@access Private
const setImage = async (req, res, next) => {
  try {
    const { userId, profileImage } = req.body;

    if (!userId || !profileImage) {
      res.status(400).json({ error: "Unable to upload photo..." });
    } else {
      // Send image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(profileImage);

      if (!uploadResponse) {
        res.status(400).json({ error: "Unable to upload photo..." });
      } else {
        // Update user profile photo
        const user = await User.findByIdAndUpdate(
          userId,
          { profileImage: uploadResponse.secure_url },
          { new: true }
        );

        if (!user) {
          res.status(500).json({ error: "Something went wrong..." });
        } else {
          const filteredUser = filterUserData(user);
          res.status(201).json(filteredUser);
        }
      }
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//@desc   Update profile info text
//@route  Post /profile/setInfo
//@access Private
const setInfo = async (req, res, next) => {
  try {
    const { userId, userInfo } = req.body;

    if (!userInfo) {
      res.status(400).json({ error: "Unable to update user info..." });
    } else {
      const user = await User.findByIdAndUpdate(
        userId,
        { profileInfo: userInfo },
        { new: true }
      );

      if (!user) {
        res.status(500).json({ error: "Something went wrong..." });
      } else {
        const filteredUser = filterUserData(user);
        res.status(201).json(filteredUser);
      }
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

module.exports = {
  setImage,
  setInfo,
};
