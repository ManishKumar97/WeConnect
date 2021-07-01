const express = require("express");
const conversationController = require("../controllers/conversationController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/getconversations", conversationController.getConversations);
router.post("/createconversation", conversationController.createConversation);

module.exports = router;
