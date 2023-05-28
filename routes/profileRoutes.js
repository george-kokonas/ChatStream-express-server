const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/profileControllers");

router.post("/uploadImage", uploadImage);

module.exports = router;
