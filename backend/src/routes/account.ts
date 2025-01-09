import express from "express";
import authMiddleware from "../middleware";
import Account from "../db2";
import mongoose from "mongoose";

const router = express.Router();
//@ts-ignore
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.body.userId,
  });

  if (account) {
    res.json({
      balance: account.balance,
    });
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});
// @ts-ignore
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({
    // @ts-ignore
    userId: req.body.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  //perform the transfer
  await Account.updateOne(
    { userId: req.body.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

export default router;
