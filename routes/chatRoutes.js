const express = require("express");
const auth = require("../middleware/auth");
const {
  createChatRoom,
  getChatRoom,
  createMessage,
  getLastMessages,
  getMessages,
  getUnseenMessages,
  updateMessagesStatus
} = require("../controllers/chatControllers");

const router = express.Router();

router.post("/createChatRoom", auth, createChatRoom);
router.get("/getChatRoom/:userId", auth, getChatRoom);
router.get("/getNewChatRoom/:roomId", auth, getChatRoom);

router.post("/createMessage", auth, createMessage);
router.get("/getMessages/:requestedRoomId", auth, getMessages);
router.get("/getLastMessages/:roomsIds",auth, getLastMessages);
router.get("/getUnseenMessages/:userId", auth, getUnseenMessages)
router.put("/updateMessagesStatus/:roomId",auth, updateMessagesStatus)

module.exports = router;
