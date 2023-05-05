const express = require("express");
const router = express.Router();
const Conversation = require("../models/ConverstationModel");

//@desc   Create new conversation
//@route  Post /conversation/new
//@access Private
router.post("/new", async (req, res) => {
  const { senderId, receiverId } = req.body;

  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).send(error);
  }
});

//@desc   Retrieve existing conversation
//@route  Get /conversation/get
//@access Private
router.get("/get/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const conversation = await Conversation.find()
      .where("members")
      .equals(userId);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
