const express = require("express");
const router = express.Router();
const {getUser,getRegisteredUsers} = require("../controllers/userControllers")


router.get("/getUser/:userId" , getUser);
router.get("/getRegisteredUsers", getRegisteredUsers)

module.exports = router;
