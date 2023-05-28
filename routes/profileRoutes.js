const express = require("express");
const router = express.Router();
const { setImage,setInfo } = require("../controllers/profileControllers");

router.post("/setImage", setImage);
router.post("/setInfo", setInfo)
module.exports = router;
