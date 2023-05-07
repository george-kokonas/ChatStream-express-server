const ChatRoom = require("../models/ChatRoomModel");
const Message = require("../models/MessageModel");
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

//@desc   Create new message
//@route  Post /chat/createMessage
//@access Private
const createMessage = asyncHandler(async (req, res) => {
  const message = req.body;

  if (!message) {
    res.status(400);
    throw new Error("Message is required.");
  }

  const savedMessage = await Message.create(message);

  if (!savedMessage) {
    res.status(500);
    throw new Error(`Unable to create new message.`);
  }
  res.status(201).json(savedMessage);
});

//@desc   Retrieve messages by chatroom id
//@route  Get /chat/getMessages
//@access Private
const getMessages = asyncHandler(async (req, res) => {
  const { requestedRoomId } = req.params;

  const messages = await Message.find({
    roomId: requestedRoomId,
  });

  if (!messages) {
    res.status(404);
    throw new Error("Unable to retrieve messages...");
  }
  res.status(200).json(messages);
});

module.exports = {
  createChatRoom,
  getChatRoom,
  createMessage,
  getMessages,
};