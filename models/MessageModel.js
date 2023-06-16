const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    roomId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    receiverId: {
      type: String,
    },
    text: {
      type: String,
    },
    isSeen: {
      type: Boolean,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
