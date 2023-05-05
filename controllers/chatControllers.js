const ChatRoom = require("../models/ChatRoomModel");
const asyncHandler = require("express-async-handler");

//@desc   Create new chatroom
//@route  Post /chat/createChatRoom
//@access Private
const createChatRoom = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    res.status(400);
    throw new Error("Both user Id and receiver Id are required...");
  }

  const newChatRoom = await ChatRoom.create({
    members: [senderId, receiverId],
  });
  console.log();

  if (!newChatRoom) {
    res.status(400);
    res.send({ message: "Can't create new ChatRoom" });
    throw new Error("Can't create new ChatRoom...");
  }
  res.status(201).json(newChatRoom);
});

//@desc   Retrieve existing chatroom by userId
//@route  Get /chat/getChatRoom/:userId
//@access Private
const getChatRoom = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const chatRoom = await ChatRoom.find().where("members").equals(userId);

  if (!chatRoom) {
    res.status(404);
    throw new Error(`No chat room found for user ${userId}`);
  }
  res.status(200).json(chatRoom);
});

module.exports = {
  createChatRoom,
  getChatRoom,
};
