const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
const otpRouter = require("./otp");
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/otp", otpRouter);

module.exports = router;
