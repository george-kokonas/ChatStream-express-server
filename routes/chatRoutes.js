const express = require("express");
const router = express.Router();

const {createChatRoom,getChatRoom,createMessage, getMessages} = require("../controllers/chatControllers")

router.post("/createChatRoom", createChatRoom);
router.get("/getChatRoom/:userId",getChatRoom);

router.post("/createMessage", createMessage)
router.get("/getMessages/:requestedRoomId" , getMessages)

module.exports = router;
