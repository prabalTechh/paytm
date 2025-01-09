import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import mainRouter from "./routes/index";

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 4000;

const router = express.Router();

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
