const express = require("express");
const auth = require("../middleware/auth");
const {
  getUser,
  getRegisteredUsers, 
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/getUser/:userId", auth, getUser);
router.get("/getRegisteredUsers",auth, getRegisteredUsers);

module.exports = router;
