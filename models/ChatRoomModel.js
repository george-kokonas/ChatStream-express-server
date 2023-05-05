const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
);

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);
