const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db/db");
const router = express.Router();
const authMiddleware = require("../middlewares/middleware");
const zod = require("zod");
const passSchema = zod.string().min(6);
const { OTP } = require("../db/db");

//user Signup
router.post("/signup", async (req, res) => {
  //zod validations

  const otp = req.body.otp;

  const response = await OTP.find({ email: req.body.username })
    .sort({ createdAt: -1 })
    .limit(1);
  if (response.length === 0 || otp !== response[0].otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const hashedPassword = await newUser.createHash(req.body.password);
  newUser.password = hashedPassword;

  let user = null;

  try {
    user = await newUser.save();
  } catch (error) {
    return res.status(411).json({
      message: "Email already in use / Incorrect inputs",
    });
  }

  const token = "Bearer " + jwt.sign({ userId: user._id }, JWT_SECRET);

  await Account.create({
    userId: user._id,
    balance: Math.floor(1 + Math.random() * 1000),
  });

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  // checking if user exists in DB
  if (!user)
    return res.status(400).json({
      message: "User not found",
    });

  //checking if password is correct
  if (!(await user.validatePassword(req.body.password)))
    return res.status(400).json({
      message: "Incorrect Password",
    });

  const token = "Bearer " + jwt.sign({ userId: user._id }, JWT_SECRET);

  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
  };

  res
    .status(200)
    .json({ message: "User Successfully Logged In", token, userData });
});

router.put("/update", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const user = await User.findById({ _id: userId });

  if (req.body.password && req.body.password !== "") {
    //zod validation of password
    const passResponse = passSchema.safeParse(req.body.password);

    if (!passResponse.success)
      return res
        .status(404)
        .json({ message: "Password should be of 6 or more characters" });

    //checking if last password is same
    if (await user.validatePassword(req.body.password))
      return res
        .status(404)
        .json({ message: "Password should not be same as last password" });

    //creating hashed password
    req.body.password = await user.createHash(req.body.password);
  }

  await user.updateOne(req.body);

  res.json({ message: "Update Successful", user });
});

router.get("/bulk", async (req, res) => {
  const searchName = req.query.filter || "";
  const nameParts = searchName.split(" ");

  let query = {};

  if (nameParts.length == 2) {
    //if I am getting both first and last name
    const [firstName, lastName] = nameParts;

    query = {
      firstName: new RegExp(firstName, "i"),
      lastName: new RegExp(lastName, "i"),
    };
  } else if (nameParts.length == 1) {
    //if I am getting either first or last name
    const name = nameParts[0];

    query = {
      $or: [
        { firstName: new RegExp(name, "i") },
        { lastName: new RegExp(name, "i") },
      ],
    };
  }

  const searchResult = await User.find(query);

  const users = searchResult.map((user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    _id: user._id,
    username: user.username,
  }));

  res.status(202).json({ users });
});

router.delete("/delete", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const user = await User.findById({ _id: userId });

  if (!user)
    return res.status(400).json({
      message: "User not found",
    });

  await user.deleteOne();
  await Account.deleteOne({ userId });

  res.status(200).json({ message: "User deleted successfully" });
});

module.exports = router;
