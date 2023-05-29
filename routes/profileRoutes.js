const express = require("express");
const auth = require("../middleware/auth");
const { setImage, setInfo } = require("../controllers/profileControllers");

const router = express.Router();

router.post("/setImage",auth, setImage);
router.post("/setInfo",auth, setInfo);
module.exports = router;
