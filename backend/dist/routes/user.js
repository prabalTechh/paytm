"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const middleware_1 = __importDefault(require("../middleware"));
const db2_1 = __importDefault(require("../db2"));
const router = express_1.default.Router();
const signUpSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string(),
    firstname: zod_1.default.string(),
    lastname: zod_1.default.string(),
});
const signInSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string(),
});
const updateSchema = zod_1.default.object({
    password: zod_1.default.string().optional(),
    firstname: zod_1.default.string().optional(),
    lastname: zod_1.default.string().optional(),
});
//@ts-ignore
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parseResult = signUpSchema.safeParse(body);
    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid data" });
    }
    try {
        const existingUser = yield db_1.default.findOne({ username: body.username });
        if (existingUser === null || existingUser === void 0 ? void 0 : existingUser._id) {
            return res.status(400).json({ message: "Username already exists" });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const dbUser = yield db_1.default.create(body);
        yield db2_1.default.create({
            userId: dbUser._id, // Use the _id of the newly created user
            balance: 1 + Math.random() * 10000,
        });
        const token = jsonwebtoken_1.default.sign({
            userId: dbUser._id,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log(token);
        return res.status(201).json({
            message: "User created successfully",
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}));
// @ts-ignore
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const obj = signInSchema.safeParse(req.body);
    if (!obj.success) {
        return res.json({
            message: "Invalid data",
        });
    }
    try {
        const { username, password } = obj.data;
        const user = yield db_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Verify JWT_SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const passwordIsValid = bcryptjs_1.default.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // const dbUser = await User.create(body);
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log(token);
        return res.status(201).json({
            message: "Sign In successfully",
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}));
//@ts-ignore
router.put("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information",
        });
    }
    const updatedUser = yield db_1.default.updateOne(req.body, {
        // @ts-ignore
        id: req.userId,
    }, {
        $set: req.body,
    });
    if (updatedUser.modifiedCount === 0) {
        return res.status(404).json({
            message: "User not found or no changes made"
        });
    }
    res.json({
        message: "Updated successfully",
    });
}));
//@ts-ignore
router.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || ""; // Default to an empty string if filter is not provided
    // Check if the filter is not empty
    if (!filter) {
        return res
            .status(400)
            .json({ message: "Filter query parameter is required" });
    }
    try {
        // Perform the query with case-insensitive regex
        const users = yield db_1.default.find({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}));
exports.default = router;
