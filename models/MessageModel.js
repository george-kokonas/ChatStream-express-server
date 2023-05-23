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
    text: {
      type: String,
    },
    isSeen: {
      type: Boolean,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

module.exports = mongoose.model("Message", MessageSchema);
