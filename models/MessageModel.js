const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    roomId:{
      type: String
    },
    senderId:{
      type:String
    },
    text:{
      type: String
    }
  },
);

module.exports = mongoose.model("Message", MessageSchema);
 