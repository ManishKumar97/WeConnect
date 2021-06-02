const express = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", authController.signup_post);

router.post("/login", authController.login_post);

router.get("/", requireAuth, authController.checkLoginStatus);

module.exports = router;
