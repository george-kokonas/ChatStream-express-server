const express = require("express");
const auth = require("../middleware/auth");
const {
  createChatRoom,
  getChatRoom,
  deleteChatRoom,
  createMessage,
  getMessagesPreview,
  getMessages,
  getUnseenMessages,
  updateMessagesStatus,
} = require("../controllers/chatControllers");

const router = express.Router();

router.post("/createChatRoom", auth, createChatRoom);
router.get("/getChatRoom/:userId", auth, getChatRoom);
router.get("/getNewChatRoom/:roomId", auth, getChatRoom);
router.delete("/deleteChatRoom", auth, deleteChatRoom);

router.post("/createMessage", auth, createMessage);
router.get("/getMessages/:requestedRoomId", auth, getMessages);
router.get("/getMessagesPreview/:roomsIds", auth, getMessagesPreview);
router.get("/getUnseenMessages/:userId", auth, getUnseenMessages);
router.put("/updateMessagesStatus/:roomId", auth, updateMessagesStatus);

module.exports = router;
