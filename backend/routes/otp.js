const express = require("express");
const router = express.Router();
const { User, OTP } = require("../db/db");
const otpGenerator = require("otp-generator");
const zod = require("zod");
const emailSchema = zod.string().email();
const passSchema = zod.string().min(6);

router.post("/send-otp", async (req, res) => {
  //zod validation for username
  const usernameResponse = emailSchema.safeParse(req.body.username);

  if (!usernameResponse.success)
    return res.status(411).json({
      message: "Invalid Email",
    });

  //zod validation for password
  const passResponse = passSchema.safeParse(req.body.password);

  if (!passResponse.success)
    return res.status(411).json({
      message: "Password should be of 6 or more characters",
    });

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
    await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Please try again after sometime" });
  }
});

module.exports = router;
