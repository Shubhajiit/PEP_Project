const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controllers");

router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
