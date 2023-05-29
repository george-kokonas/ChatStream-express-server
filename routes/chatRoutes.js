const express = require("express");
const auth = require("../middleware/auth");
const {
  createChatRoom,
  getChatRoom,
  createMessage,
  getMessages,
} = require("../controllers/chatControllers");

const router = express.Router();

router.post("/createChatRoom",auth, createChatRoom);
router.get("/getChatRoom/:userId", auth, getChatRoom);

router.post("/createMessage",auth, createMessage);
router.get("/getMessages/:requestedRoomId", auth, getMessages);

module.exports = router;
