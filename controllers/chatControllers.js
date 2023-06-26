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

//@desc   Retrieve existing chatroom by userId or roomId
//@route  Get /chat/getChatRoom/:userId
//@route  Get /chat/getNewChatRoom/:roomId
//@access Private
const getChatRoom = asyncHandler(async (req, res) => {
  let chatRoom;

  if (req.params.userId) {
    const { userId } = req.params;
    chatRoom = await ChatRoom.find().where("members").equals(userId);
  } else if (req.params.roomId) {
    const { roomId } = req.params;
    chatRoom = await ChatRoom.findById(roomId);
  } else {
    res.status(400);
    throw new Error("Invalid request");
  }

  if (!chatRoom) {
    res.status(404);
    chatRoom = [];
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

//@desc   Retrieve messages for spesific chatroom
//@route  Get /chat/getMessages:requestedRoomId
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

//@desc   Retrieve last messages for all user rooms
//@route  Get /chat/getLastMessages/:roomsIds
//@access Private
const getLastMessages = asyncHandler(async (req, res) => {
  const { roomsIds } = req.params;
  const idsArray = roomsIds.split(",");

  //find the messages that belongs to the given chatrooms
  const lastMessages = await Message.find({
    roomId: { $in: idsArray },
  })
    //sort messages in descending order(most recent first)
    .sort({ createdAt: -1 })

    //get only the last message
    .limit(idsArray.length);

  if (!lastMessages) {
    res.status(404);
    throw new Error("Unable to retrieve messages.");
  }

  res.status(200).json(lastMessages);
});

//@desc   Retrieve unseen messages
//@route  Get /chat/getUnseenMessages/:userId
//@access Private
const getUnseenMessages = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    throw new Error("Unable to retrieve messages status. User id not found...");
  }

  const unseenMessages = await Message.find({
    receiverId: userId,
    isSeen: false,
  });

  if (!unseenMessages) {
    res.status(400);
    throw new Error("Unable to retrieve messages status...");
  }

  res.status(200).json(unseenMessages);
});

//@desc   Update messages status to seen
//@route  Put /chat/updateMessagesStatus
//@access Private
const updateMessagesStatus = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  try {
    // Update only messages in the requested room with isSeen:false status
    const result = await Message.updateMany(
      { roomId, isSeen: false },
      { $set: { isSeen: true } }
    );
    res.json({
      success: true,
      message: "Messages status updated successfully",
    });
  } catch (error) {
    // Handle the database update error
    res
      .status(500)
      .json({ success: false, message: "Failed to update message status" });
    throw new Error("Unable to update messages status...");
  }
});

module.exports = {
  createChatRoom,
  getChatRoom,
  createMessage,
  getMessages,
  getLastMessages,
  getUnseenMessages,
  updateMessagesStatus,
};
