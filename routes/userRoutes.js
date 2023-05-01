const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  getAllUsers,
} = require("../controllers/userControllers/getAllUsers");

router.get("/getAll", auth, getAllUsers);

module.exports = router;
