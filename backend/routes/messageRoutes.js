const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();

router.post("/getmessages", messageController.getMessages);
router.post("/sendmessage", messageController.sendMessage);

module.exports = router;
