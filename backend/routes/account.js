const express = require("express");
const authMiddleware = require("../middlewares/middleware");
const { Account } = require("../db/db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const accountInfo = await Account.findOne({ userId });

  res.json({ balance: accountInfo.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  if (req.userId === req.body.to) {
    return res.status(400).json({
      message: "Cannot transfer to self account",
    });
  }
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const fromAccount = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!fromAccount || fromAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  //updating fromAccount
  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({ message: "Transer Done" });
});

module.exports = router;
