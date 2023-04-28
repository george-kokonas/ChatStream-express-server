const express = require("express");
const router = express.Router();
const {
  getAllUsers,
} = require("../controllers/privateControllers/getAllUsers");
const auth = require("../middleware/auth")

router.get("/getAll",auth, getAllUsers);

module.exports = router;
 