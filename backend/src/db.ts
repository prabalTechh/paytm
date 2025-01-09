import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

const connectionDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "your_default_mongo_uri";

    await mongoose.connect(mongoUri).then(() => {
      console.log("Connected to database");
    });
  } catch (error) {
    console.log(error);
  }
};
connectionDb();

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim : true,
    maxLength: 50,
  },
  lastname: {
    type: String,
    required: true,
    trim : true,  
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim:true,
    lowercase:true,
    minLength: 3,
    maxLength: 25,
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
});

const User = mongoose.model("User", userSchema);

export default User;
