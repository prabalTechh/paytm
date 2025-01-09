import express from "express";
import user from "./user"; // Import the user route
import account from "./account"; // Import the account route

const router = express.Router(); // Create a new router

router.use("/user", user);
router.use("/account" , account); // Use the user route

export default router; // Export the router
