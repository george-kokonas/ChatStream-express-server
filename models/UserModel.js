const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email..."],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username..."],
    unique: [true, "Username already exists..."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password..."],
    unique: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
