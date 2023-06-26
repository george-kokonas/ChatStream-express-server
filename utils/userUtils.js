//exclude users password and email
const filterUserData = (user) => {
    return {
      _id: user._id,
      username: user.username,
      profileImage: user.profileImage,
      profileInfo: user.profileInfo,
    };
  };
  
  module.exports = {
    filterUserData,
  };
  