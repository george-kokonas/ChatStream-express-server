const express = require("express");
const router = express.Router();

const {createChatRoom,getChatRoom} = require("../controllers/chatControllers")

router.post("/createChatRoom", createChatRoom);
router.get("/getChatRoom/:userId",getChatRoom)

module.exports = router;
