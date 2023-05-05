const express = require("express");
const router = express.Router();

const {createChatRoom,getChatRoom,createMessage} = require("../controllers/chatControllers")

router.post("/createChatRoom", createChatRoom);
router.get("/getChatRoom/:userId",getChatRoom);

router.post("/createMessage", createMessage)

module.exports = router;
