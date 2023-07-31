const ChatRoom = require("../models/ChatRoomModel");
const Message = require("../models/MessageModel");

//@desc   Create new chatroom
//@route  Post /chat/createChatRoom
//@access Private
const createChatRoom = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      res
        .status(400)
        .json({ message: "Both user Id and receiver Id are required..." });
    }

    const newChatRoom = await ChatRoom.create({
      members: [senderId, receiverId],
    });

    if (!newChatRoom) {
      res.status(400).json({ message: "Can't create new ChatRoom" });
    }

    res.status(201).json(newChatRoom);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//@desc   Retrieve existing chatroom by userId or roomId
//@route  Get /chat/getChatRoom/:userId
//@route  Get /chat/getNewChatRoom/:roomId
//@access Private
const getChatRoom = async (req, res, next) => {
  let chatRoom;
  try {
    //Depending on received params, execute different operations
    if (req.params.userId) {
      const { userId } = req.params;
      chatRoom = await ChatRoom.find().where("members").equals(userId);
    } else if (req.params.roomId) {
      const { roomId } = req.params;
      chatRoom = await ChatRoom.findById(roomId);
    } else {
      res.status(400).json({ message: "Invalid request" });
    }

    if (!chatRoom) {
      chatRoom = [];
    }

    res.status(200).json(chatRoom);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//@desc   Delete chatroom
//@route  Delete /chat/deleteChatRoom/
//@access Private
const deleteChatRoom = async (req, res, next) => {
  try {
    const { roomId, userId } = req.body;
    const chatRoom = await ChatRoom.findById(roomId);

    if (!chatRoom) {
      return res.status(404).json({ error: "Chat room not found" });
    }

    // Check if the user is a member of the chat room
    if (!chatRoom.members.includes(userId)) {
      return res
        .status(403)
        .json({ error: "You are not a member of this chat room" });
    }

    // Remove the user from the chat room
    chatRoom.members = chatRoom.members.filter(
      (memberId) => memberId !== userId
    );

    // If the chat room has no members (the other participant deleted the conversation)
    if (chatRoom.members.length === 0) {
      // Delete messages
      await Message.deleteMany({ roomId });

      // Delete chat room
      await ChatRoom.findByIdAndDelete(roomId);
    } else {
      // Save changes after filtering members array
      await chatRoom.save();
    }

    res.sendStatus(204);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//@desc   Create new message
//@route  Post /chat/createMessage
//@access Private
const createMessage = async (req, res, next) => {
  try {
    const message = req.body;

    if (!message) {
      res.status(400).json({ message: "Message is required." });
    } else {
      const savedMessage = await Message.create(message);

      if (!savedMessage) {
        res.status(500).json({ message: "Unable to create new message." });
      } else {
        res.status(201).json(savedMessage);
      }
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//@desc   Retrieve messages for spesific chatroom
//@route  Get /chat/getMessages:requestedRoomId
//@access Private
const getMessages = async (req, res, next) => {
  try {
    const { requestedRoomId } = req.params;

    const messages = await Message.find({
      roomId: requestedRoomId,
    });

    if (!messages) {
      res.status(404).json({ error: "Unable to retrieve messages..." });
    } else {
      res.status(200).json(messages);
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//@desc   Retrieve last messages for all user rooms to render preview
//@route  Get /chat/getLastMessages/:roomsIds
//@access Private
const getMessagesPreview = async (req, res, next) => {
  try {
    const { roomsIds } = req.params;
    const idsArray = roomsIds.split(",");

    // Find the messages that belong to the given chat rooms
    const lastMessages = await Message.find({
      roomId: { $in: idsArray },
    })
      // Sort messages in descending order (most recent first)
      .sort({ createdAt: -1 })

      // Get only the last message
      .limit(idsArray.length);

    if (!lastMessages) {
      res.status(404).json({ error: "Unable to retrieve messages." });
    } else {
      res.status(200).json(lastMessages);
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//@desc   Retrieve unseen messages
//@route  Get /chat/getUnseenMessages/:userId
//@access Private
const getUnseenMessages = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        error: "Unable to retrieve messages status. User id not found...",
      });
    } else {
      const unseenMessages = await Message.find({
        receiverId: userId,
        isSeen: false,
      });

      if (!unseenMessages) {
        res
          .status(404)
          .json({ error: "Unable to retrieve messages status..." });
      } else {
        res.status(200).json(unseenMessages);
      }
    }
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//@desc   Update messages status to seen
//@route  Put /chat/updateMessagesStatus
//@access Private
const updateMessagesStatus = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    // Update only messages in the requested room with isSeen:false status
    await Message.updateMany(
      { roomId, isSeen: false },
      { $set: { isSeen: true } }
    );

    res.json({
      success: true,
      message: "Messages status updated successfully",
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

module.exports = {
  createChatRoom,
  getChatRoom,
  deleteChatRoom,
  createMessage,
  getMessages,
  getMessagesPreview,
  getUnseenMessages,
  updateMessagesStatus,
};
