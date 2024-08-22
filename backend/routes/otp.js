const express = require("express");
const router = express.Router();
const { User, OTP } = require("../db");
const otpGenerator = require("otp-generator");

router.post("/send-otp", async (req, res) => {
  try {
    const email = req.body.username;
    // Check if user is already present
    const checkUserPresent = await User.findOne({
      username: req.body.username,
    });
    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "Email is already registered",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Please try again after sometime" });
  }
});

module.exports = router;
