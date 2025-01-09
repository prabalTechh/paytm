"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user")); // Import the user route
const account_1 = __importDefault(require("./account")); // Import the account route
const router = express_1.default.Router(); // Create a new router
router.use("/user", user_1.default);
router.use("/account", account_1.default); // Use the user route
exports.default = router; // Export the router
