import express, { Request, Response } from "express";
import User from "../db";
import zod from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware";
import mongoose from "mongoose";
import Account from "../db2";
const router = express.Router();

const signUpSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

//@ts-ignore
router.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;

  const parseResult = signUpSchema.safeParse(body);

  if (!parseResult.success) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const existingUser = await User.findOne({ username: body.username });

    if (existingUser?._id) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const dbUser = await User.create(body);

    await Account.create({
      userId: dbUser._id, // Use the _id of the newly created user
      balance: 1 + Math.random() * 10000,
    });
    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    console.log(token);
    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

// @ts-ignore
router.post("/signin", async (req, res) => {
  const body = req.body;
  const obj = signInSchema.safeParse(req.body);
  if (!obj.success) {
    return res.json({
      message: "Invalid data",
    });
  }
  try {
    const { username, password } = obj.data;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const passwordIsValid = bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // const dbUser = await User.create(body);
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    console.log(token);
    return res.status(201).json({
      message: "Sign In successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

//@ts-ignore
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  const updatedUser =  await User.updateOne(
    req.body,
    {
      // @ts-ignore
      id: req.userId,
    },
    {
      $set: req.body,
    }
  );

  if (updatedUser.modifiedCount === 0) {
    return res.status(404).json({
      message: "User not found or no changes made"
    });
  }

  res.json({
    message: "Updated successfully",
  });
});

interface UserProp {
  username: string;
  firstname: string;
  lastname: string;
  _id: mongoose.Types.ObjectId;
}
//@ts-ignore
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || ""; // Default to an empty string if filter is not provided

  // Check if the filter is not empty
  if (!filter) {
    return res
      .status(400)
      .json({ message: "Filter query parameter is required" });
  }

  try {
    // Perform the query with case-insensitive regex
    const users = await User.find({
      $or: [
        {
          firstname: {
            $regex: filter,
            $options: "i", // Case-insensitive search
          },
        },
        {
          lastname: {
            $regex: filter,
            $options: "i", // Case-insensitive search
          },
        },
      ],
    });

    // Return the matched users
    return res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstname,
        lastName: user.lastname,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
